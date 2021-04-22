import ProfileForm from '../../Profile/Form';
import classes from './UserProfile.module.css';

function UserProfile() {
  // Redirect away if NOT Auth

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
