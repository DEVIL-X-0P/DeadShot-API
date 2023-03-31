const { sendAlertNotification ,replaceTagWithData} = require('./common');

const registerInternalUser = (data, alert) => {
    try{
        if(alert.status === true) {
            if (!empty(data)) {
                const { user } = data;
                let replacement = {
                    '[NAME]': user.first_name,
                    '[ACTIVATE_LINK]': `${Func.getAdminPortalUrl(alert)}activate-account/${user.activation_key}`,
                };
                let comReplace = replaceTagWithData(data);
                replacement = { ...comReplace, ...replacement };
                alert.text_body = replaceMulti(alert.text_body, replacement);
                alert.rtn_subject = replaceMulti(alert.rtn_subject, replacement);
                alert.rtn_body = replaceMulti(alert.rtn_body, replacement);
                alert.subject = replaceMulti(alert.subject, replacement);
                alert.body = replaceMulti(alert.body, replacement);
                alert.to = [];
                alert.to_emails = [user.email];
                alert.recervier_ids = [user._id];
                sendAlertNotification(data, alert);
            }
        }
        return true;
    }catch(err){
        throwError(err);
    }
};


module.exports = {
    registerInternalUser,
};