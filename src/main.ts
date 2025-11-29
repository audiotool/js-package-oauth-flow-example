import { createAudiotoolClient } from "@audiotool/nexus"
import { createOIDCAuthManager } from "@audiotool/nexus/utils"
import {
  loginButton,
  logoutButton,
  setProjects,
  setStatus,
  setUserInfo,
} from "./edit-html"

const manager = createOIDCAuthManager({
  clientId: "5eeb1a66-0de1-49d8-a230-3ce22f2dff57",
  redirectUrl: "http://127.0.0.1:5173/",
  scope: "user:read project:read",
})

loginButton.addEventListener("click", () => {
  manager.startAuthFlow()
})

logoutButton.addEventListener("click", () => {
  manager.logout()
})
const auth = await manager.getAuthentication()
if (!auth.loggedIn) {
  setStatus("Logged out")
  logoutButton.style.display = "none"
  loginButton.style.display = "block"
} else {
  setStatus("Logged in")
  logoutButton.style.display = "block"
  loginButton.style.display = "none"

  const client = await createAudiotoolClient({ token: manager.mustGetToken })
  setUserInfo(await client.api.userService.getUser({}))
  setProjects(await client.api.projectService.listProjects({}))
}
