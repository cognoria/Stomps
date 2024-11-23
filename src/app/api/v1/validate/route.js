
import { apiHandler } from "../../../../helpers/server/api";

module.exports = apiHandler({
    GET: validate,
});

//route GET api/v1/validate
async function validate() {
    const { INSTALLATION_KEY, PURCHASE_EMAIL } = process.env;

    if (!INSTALLATION_KEY || !PURCHASE_EMAIL) {
        return { error: 'Invalid license keys' };
    }

    const res = await axios.get(`https://api.stomps.io/${INSTALLATION_KEY}/validate/${PURCHASE_EMAIL}`);

    if (!res.data.valid) {
        return { error: 'Invalid license keys' };
    }

    return { message: 'License keys are valid' };
}
