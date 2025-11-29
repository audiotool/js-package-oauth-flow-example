import type {
  GetUserResponse,
  ListProjectsResponse,
} from "@audiotool/nexus/api"

export const loginButton = document.getElementById(
  "login-button"
) as HTMLButtonElement
export const logoutButton = document.getElementById(
  "logout-button"
) as HTMLButtonElement

export const setStatus = (status: string) => {
  const statusElement = document.getElementById(
    "status"
  ) as HTMLParagraphElement
  statusElement.textContent = status
}

export const setUserInfo = (userInfo: GetUserResponse | Error) => {
  const userInfoDiv = document.getElementById("user-info") as HTMLDivElement

  if (userInfo instanceof Error) {
    userInfoDiv.innerHTML = `<p>Error getting user info: ${userInfo.message}</p>`
    return
  }

  const { user } = userInfo

  const title = `<h3>You:</h3>`
  const list = [
    ["Name", user?.name],
    ["Display Name", user?.displayName],
    ["Description", user?.description],
    ["Links", user?.links?.map((link) => emptyToDash(link)).join(", ")],
  ]
    .map(([key, value]) => {
      return `<p><strong>${key}</strong>: ${emptyToDash(value)}</p>`
    })
    .join("\n")

  userInfoDiv.innerHTML = `${title}\n${list}`
}

export const setProjects = (projects: ListProjectsResponse | Error) => {
  const projectsDiv = document.getElementById("projects") as HTMLDivElement
  if (projects instanceof Error) {
    projectsDiv.innerHTML = `<p>Error getting projects: ${projects.message}</p>`
    return
  }
  const title = `<h3>Your Projects</h3>`
  const list = projects.projects
    .map((project) => {
      return `<li><strong>${project.displayName}</strong>: ${project.description}</li>`
    })
    .join("\n")
  projectsDiv.innerHTML = `${title}\n<ul>${list}</ul>`
}

const emptyToDash = (str: string | undefined) =>
  (str ?? "") === "" ? "-" : str
