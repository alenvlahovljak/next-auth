import {useRef, FormEvent} from "react";

import classes from './Form.module.css';

function ProfileForm(props) {
    const oldPasswordRef = useRef<HTMLInputElement | null>(null)
    const newPasswordRef = useRef<HTMLInputElement | null>(null)

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const oldPassword = oldPasswordRef.current.value
        const newPassword = newPasswordRef.current.value


        props.onChangePassword({
            oldPassword, newPassword
        })
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input ref={newPasswordRef} type='password' id='new-password'/>
            </div>
            <div className={classes.control}>
                <label htmlFor='old-password'>Old Password</label>
                <input ref={oldPasswordRef} type='password' id='old-password'/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
