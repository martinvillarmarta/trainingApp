const sendMailjetMail = async (to, subject, text, from) =>
{
    console.log(`Email to ${to} from ${from} with subject ${subject}: ${text}`);
}

module.exports = { sendMailjetMail };