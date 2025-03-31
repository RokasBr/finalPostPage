import Login from "../components/Login";
import Register from "../components/Register";

const IndexPage = () => {
    return (
        <div className="d-flex p-5">
            <div className="grow1">
                <Login />
            </div>
            <div className="grow1">
                <Register />
            </div>
        </div>
    );
};

export default IndexPage;