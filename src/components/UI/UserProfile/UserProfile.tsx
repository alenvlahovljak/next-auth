import ProfileForm from '../../Profile/Form';

import classes from './UserProfile.module.css';

function UserProfile() {
    const changePasswordHandler = async (passwords: Record<string, string>) => {
        const res = await fetch("/api/user/change-password", {
            method: "PATCH",
            body: JSON.stringify(passwords),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()
        console.log('data', data)

    }

    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm onChangePassword={changePasswordHandler}/>
        </section>
    );
}

export default UserProfile;
