


const serverworks = async (req,res) => {
    try {
        res.json("server works")
    } catch (error) {
        res.json(error)
    }
}

module.exports = { serverworks }