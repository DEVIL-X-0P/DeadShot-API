const SMS = {};
const tags = require('../../modules/notifications/tags.json');
const sendEmail = (alert) => {
    let email = {};
    const {layout = ''} = alert;
    email.emailType = layout;
    email.message = alert.body;
    email.to = _.uniq(alert.to);
    email.cc = _.uniq(alert.cc);
    email.bcc = _.uniq(alert.bcc);
    //email.from = alert.sender_email;
    //email.fromName = alert.sender_name;
    email.replyTo = alert.reply_to;
    email.subject = alert.subject;
    email.attachments = alert.attachments;
    Email.send(email)
        .then(result => {
        })
        .catch(err => {
            console.log('email-send error', err)
        });
};
const sendNotification = async (alert) => {
    const {
        tenant,
        rtn_type,
        rtn_subject,
        alert_type,
        subject,
        body,
        text_body,
        rtn_body,
        job = undefined,
        company = undefined,
        candidate = undefined,
        placement = undefined,
        interview = undefined,
        timesheet = undefined
    } = alert;
    let receiverIds = _.uniq(alert.recervier_ids.map(V => {
        return V.toString()
    }));
    let role;
    if (!!Auth.get()) {
        let authUser = Auth.get();
        role = authUser.role;
    }
    if (receiverIds) {
        for (let receiver of receiverIds) {
            if (!empty(receiver)) {
                try {
                    await Services.Notification.add({
                        tenant: tenant,
                        type: rtn_type,
                        subject: rtn_subject,
                        role: role,
                        media: alert_type,
                        email_subject: subject,
                        email_body: body,
                        text_body: text_body,
                        body: rtn_body,
                        is_system: true
                    });
                } catch (err) {
                    console.log("Error sendNotification", err)
                    return null;
                }
            }
        }
    }
};
module.exports = {
    sendAlertNotification: async (data, alert) => {
        try{
            const {
                client_user_email = '',
                client_user_id = ''
            } = data;
            let to = [];
            let cc = [];
            let cc_emails = [];
            let bcc_emails = [];
            let to_emails = [];
            let phone = [];
            let sender_email = '';
            let sender_name = '';

            let recervier_ids = alert.recervier_ids && Array.isArray(alert.recervier_ids)
                ? alert.recervier_ids : [];
            if (alert.to.includes('client-user') && !empty(client_user_email)) {
                to.push(client_user_email);
                recervier_ids.push(client_user_id);
            }

            // set to and to_emails
            alert.to = [...to, ...alert.to_emails];
            alert.to = _.uniq(alert.to)
            alert.phone = _.uniq(phone);
            alert.recervier_ids = [...recervier_ids];
            alert.cc = [...cc, ...alert.cc_emails];
            alert.bcc = [...bcc_emails, ...alert.bcc_emails];

            if ((alert.alert_type == "Email" || alert.alert_type == "Both") && alert.to.length > 0) {
                sendEmail(alert);
            }
            if ((alert.alert_type == "Text" || alert.alert_type == "Both") && alert.phone.length > 0) {
                SMS.send(alert);
            }
            if (!empty(alert.recervier_ids)) {
                sendNotification(alert);
            }
        }catch(err){
            Logger.insert({
                type:'error',
                logType: CLOUD_WATCH_LOG_TYPE.NOTIFICATION,
                extraInfo:{data, alert},
                err
            });
        }
    },
    replaceTagWithData: (data) => {
        const tenant =  getContextTenant();
        data.tenant_name = tenant.name;
        let tagsKeys = Object.keys(tags);
        let new_tags = [];
        tagsKeys.forEach(v => {
            new_tags = [...new_tags, ...tags[v]];
        });
        let dataKeys = Object.keys(data);
        let replacement = {};
        dataKeys.forEach(v => {
            const foundTag = new_tags.find(({key}) => key === v);
            if (foundTag) {
                replacement[foundTag.tag] = data[v];
            }
        });
        return replacement;
    }
};
