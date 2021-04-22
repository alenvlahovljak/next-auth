import {useState, useRef, FC, FormEvent} from 'react';

import classes from './Form.module.css';

async function createUser(email: string, password: string) {
    const res = await fetch("/api/auth/signup", {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong!")
    } else {

    }

    return data;
}

const Form: FC = () => {
    const emailInputRef = useRef<HTMLInputElement | null>(null)
    const passwordInputRef = useRef<HTMLInputElement | null>(null)

    const [isLogin, setIsLogin] = useState<boolean>(true);

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value

        if (isLogin) {

        } else {
            try {
                const res = await createUser(email, password)
                console.log(res)

            } catch (err) {
                console.log(err)
            }

        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input ref={emailInputRef} type='email' id='email' required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input ref={passwordInputRef} type='password' id='password' required/>
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Form;
