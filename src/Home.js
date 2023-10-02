import Bank from "./bank.png";

const bank = {
    maxWidth: '30%',  // Adjust the width to your preference
    height: 'auto',  // Maintain aspect ratio
    position: 'absolute',
    bottom: '10%',
    right: '10%',
}

export default function Home() {
    return(
        <div className="container mt-4 mb-4">
            <h1>Welcome to BadBank! </h1>
            <p>
                <br />
                If this is your first time here, please <em>Register</em>. <br />
                If you already registered with us, please <em>Login</em>. <br />
                <br />
                After logging in, you can use the navigation bar to Deposit, Withdraw, or check your Balance.
            </p>
            <img src={Bank} alt="BankLogo" style={bank} />
        </div>
    )
}