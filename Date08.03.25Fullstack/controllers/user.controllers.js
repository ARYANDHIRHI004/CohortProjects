const registerUser = async (req, res) => {
    res.send('registered');
} 

const loginUser = async (req, res) => {
    res.send('user Loggedin');
} 

export {registerUser,
        loginUser }