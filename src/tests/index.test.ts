import request from "supertest"
import app from "../server/bin/app"

type userObj = {
  name: string
  lastName: string | undefined
  age: number | undefined
}

describe("Test api users", () => {
  it("should return user", (done) => {
    request(app)
      .get("")
      .then(res=>{
        console.log(res)
        done()
      })
      .catch(err =>{
        console.error(err)
      })
  })
})
