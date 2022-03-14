function Login({ user }) {
    // Render user...
    return <></>
  }
  
  // This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get user
    // const res = await fetch('http://localhost:8000/api/auth/login')
    // const user = await res.json()
    const user = {}
  
    // By returning { props: { user } }, the Login component
    // will receive `user` as a prop at build time
    return {
      props: {
        user,
      },
    }
  }
  
  export default Login
  