// only the authorized user can access this page
import { message } from 'antd';
import react, { useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

function ProtectedPage({ children }) {
    const [user, setUser] = react.useState(null);
    const navigate = useNavigate();
    const validateToken = async () => {
        try {
            const response = await GetCurrentUser();
            // console.log(response);
            if (response.success) {
                setUser(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
            navigate('/login');
        }
    };
    // check if user is logged in. if not, redirect to login page
    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        } else {
            navigate('/login');
            message.error('You need to login to access this page');
        }
    }, []);

    return (
        <div>
            {user && (
                <div className='p-5'>
                    {user.name}
                    {children}
                </div>
            )}
        </div>
    )
}

export default ProtectedPage;

// what the above code does is to check if the user is logged in
// if the user is logged in, the user details are displayed
// if the user is not logged in, the user is redirected to the login page
// the user details are fetched from the server using the GetCurrentUser function
// the user details are stored in the state using the setUser function
// the user details are displayed using the user.name property
// the children are displayed using the children prop
// the children are the components that are wrapped by the ProtectedPage component
// the children are displayed only if the user is logged in
// the useEffect hook is used to check if the user is logged in
// if the user is not logged in, the user is redirected to the login page