
Hey! here i made some "rules" for our workflow. PLEASE always follow these.

**1. Commit Accepting**
- **Rule:** never commit alone. Always ensure your commits are approved by at least one team member.
- **Why:** We guarantee high-quality code and reduce bugs.

**2. Work on branches**
- **General:** `master` is the main branch. NEVER commit directly to this branch. It is used only for syncing our repos when all integration tests pass.

  **2.1. develop**
  - **Purpose:** Developer branch where we send pull requests and make smaller integrations for new features.
  - **Workflow:** Your changes from `feature/yourname` must be merged into `develop` before transitioning to `master`.

  **2.2. feature/yourname**
  - **Purpose:** This branch is for committing new changes.
  - **IMPORTANT:** Let's communicate with each other. I created the `features` section for every member.
  - **Pattern for proposing new feature:**
    - **main:** For deployment on `render.com`.
    - **your branch (feature/yourname):** Start with something like: "I started to ... <what>". PLEASE check each other’s work TO BE SURE there’s no duplication.

**3. Pull Requests (PR)**
- **Mandatory:** ALWAYS use PRs for merging changes!

  **3.1. Purpose**
  - PRs help the team understand changes and provide a space for collaboration.

  **3.2. Description**
  - Explain in the PR description:
    - What changes you made.
    - Purpose of the changes.
    - Files or areas that were modified.
    - Steps to test. (We will only run integration tests on the frontend.)

  **3.3. Review Process**
  - **Mandatory:** Every PR MUST be accepted by at least one team member before being merged.

**4. Commit messages**
- **Rule:** keep them ALWAYS SHORT AND UNDERSTANDABLE.

  **4.1. Format**
  - `<type>: <description>`

  **4.2. Types**
  - **feat:** for new features.
  - **fix:** for bug fixes.
  - **refactor:** for code restructuring without changing functionality.

  **4.2.1. Examples**
  - `feat: add a user login page`
  - `fix: fix password validation`
  - `refactor: update folder structure for components`

**5. TODO Workflow**
- **Channel:** Use the `#todo` channel to share tasks and updates.
- **Structure:** When adding tasks, use this format:
  ```
  [TODO] Task Name
  - Description: <short task description>
  - Priority: <low/medium/high>
  - Deadline: <dd-mm-yyyy>
  - Assigned to: @username
  ```
- **Status Updates:**
  - `[IN PROGRESS]` - Mark tasks that are currently being worked on.
  - `[DONE]` - Mark tasks as completed with a note about the result.

**6. Roles in the team**
- **Responsibility:** Each team member has specific roles.
- **My role:** I am responsible for integration tests. Please inform me of any changes so we can reach a consensus and ensure project consistency.

**7. Communication**
- **Rule:** Regular and open communication is key to success.
- **Request:** Let's keep each other informed about progress, issues, and ideas. This will help us avoid misunderstandings and improve our collaboration.

Let's stick to these rules to keep everything clear and make sure our workflow runs smoothly. Let me know if you have any questions or suggestions!
