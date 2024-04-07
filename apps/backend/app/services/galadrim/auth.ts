import User from '#models/user'
import axios from 'axios'

export const createUserFromEmail = async (email: string) => {
  const res = await axios.get(`https://forest.galadrim.fr/profileInfos?email=${email}`)
  if (res.status === 200) {
    const { username } = res.data
    const user = await User.updateOrCreate(
      { email },
      {
        email,
        username,
      }
    )

    return user
  }

  console.error('Error while creating user from email (forest responded non 200 code)', res.data)

  return null
}
