import db from "../models/index"


const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [
                ['name', 'DESC']
            ]
        });
        return {
                    EM: 'Get groups success' , //*error message
                    EC: 0, //*error code
                    DT: data , //*data
                }
    } catch (error) {
        console.log(error);
        return {
            EM:'error from server', //*error message
            EC: 1, //*error code
            DT: [], //*data
        }
    }
}
module.exports = {
    getGroups
}