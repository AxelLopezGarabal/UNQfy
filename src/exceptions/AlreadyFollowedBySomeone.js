module.exports =
class AlreadyFollowedBySomeone extends Error {

  constructor(followed, follower) {
    super(`${followed.name} ya tiene registrado como follower a ${follower.name}`)
  }

}

