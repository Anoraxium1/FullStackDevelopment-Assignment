s5438449, Lachlan Barnett, Thurday 9 - 11

Fabulari is a real-time chat application developed as part of the 3813ICT assignment, built on using systems such as Angular and Node.js powering live communication. Similar to platforms like WhatsApp or Discord, it allows users to exchange text and image messages, while supporting group structures for organising conversations. The application also includes adminstrative functionality, allowing privileged users to manage tasks such as adding new groups, deleting groups, modifying description and names of groups and much more. Development follows a git workflow, with frequent commits to demonstrate the project's progress from initial design through to full implementation across its two phases.

The branching strategy will follow GitFlow, using "main" and "develop" as the two core branches. The "main" branch will hold the finalised, submission-ready state of the project (including the report and documentation), while "develop" will act as the testing branch for ongoing work and upcoming features.

Commit messages will contain a concise summary of what the commit does, so that the project history can be easily read to understand progress without needing to interpret commit messages. Commits will be kept small and frequent, with each commit representing a single logical change such as adding a feature, fixing a bug, or updating documentation, rather than bundling multiple unrelated changes together.


Specifications and Assumptions (Functional Requirements)

The below summarises the functional requirements for Fabulari, derived from the client Q&A session, alongside the assumptions made where the specification was unclear, or left to developer choice.


### System / General

| ID | Functional Requirement | Assumption |
|---|---|---|
| FR-SYS1 | The system shall support real-time delivery of messages between users in the same chat room. | Implemented using a WebSocket-based connection (Node.js) so messages appear live without a page refresh. |
| FR-SYS2 | Users shall register their own account with an email, password, and profile details. | No OAuth/social sign-up; accounts are created directly through the app, and email doubles as the unique identifier. |
| FR-SYS3 | Passwords shall be hashed before being stored. | No further security hardening (e.g. 2FA, password complexity rules) is required beyond hashing, per the client's "no specific cyber security" answer. |
| FR-SYS4 | Users shall be able to change their password by entering their old password once and their new password twice. | The server verifies the old password against the stored hash and confirms the two new password entries match before updating. |
| FR-SYS5 | There is no automated password-reset/recovery flow. | If a user forgets their password, they must create a new account, as stated directly by the client. |
| FR-SYS6 | Users shall be able to toggle the UI between light and dark mode. | Theme preference is a personal display setting, separate from a group's colour theme. |
| FR-SYS7 | The application shall be usable on desktop/PC as the primary target. | Tablet responsiveness is treated as a bonus/stretch goal; no mobile app or mobile-optimised layout is required. |
| FR-SYS8 | Users shall be able to attach an image to a message. | Only PNG images are accepted, with a maximum file size of 2MB, per the client's stated limits. |
| FR-SYS9 | Links shared in messages shall be displayed as plain text, not clickable hyperlinks. | Reduces exposure to malicious/external links without needing a full link-scanning system. |
| FR-SYS10 | Chat rooms shall persist only the 5 most recent messages once a user leaves and rejoins. | While a user is actively in a room during a session they see the full session history; on rejoining later, only the last 5 stored messages are shown. |

### Users / Members

| ID | Functional Requirement | Assumption |
|---|---|---|
| FR-U1 | Users shall be able to view a list of all existing groups in the system. | Visibility is not restricted by a group's age limit; a user can see a group even if they are too young to join it. |
| FR-U2 | Users shall be able to request to join a group. | If the user does not meet the group's minimum age requirement, the join request is automatically rejected. |
| FR-U3 | Users shall be able to request that a new group be created, supplying the title, description, age limit, and colour theme with the request. | The request is sent to the super admin, who creates the group on the user's behalf; the requester becomes the group's default group admin. |
| FR-U4 | Users shall be able to propose a new chat room within a group they are a member of. | The proposal is reviewed by a group admin, who may approve or reject it; a rejection must include a reason. Once submitted, a request cannot be cancelled. |
| FR-U5 | Users shall be able to view their own pending and past-rejected room requests. | Approved requests simply appear as new rooms; there is no separate "approved requests" history to review. |
| FR-U6 | Users shall be able to send text messages and (PNG) image messages within a chat room they belong to. | No voice messages, GIFs, or other file types are supported. |
| FR-U7 | Users shall be able to see who else is currently present in a chat room, and receive a notification when someone joins or leaves. | Presence is scoped to the room the user is actively viewing. |
| FR-U8 | Users shall have a profile page, editable by themselves, including an optional profile photo. | All profile fields are editable except the email address, which is the account's unique identifier. Profiles are private and not viewable by other users. |
| FR-U9 | Messages shall display a timestamp and the sender's profile photo. | No message editing, deletion, or reply/threading feature is required. |
| FR-U10 | Users shall be able to leave a group at any time. | Leaving a group does not delete the user's account, only their membership of that group. |

### Group Admin

| ID | Functional Requirement | Assumption |
|---|---|---|
| FR-GA1 | A group admin shall be able to edit their group's description, age limit, and colour theme. | Per the client's later clarification, the group's name cannot be changed once created, even by its group admin. |
| FR-GA2 | A group admin shall be able to approve or reject user-submitted chat room requests, supplying a reason for any rejection. | Chat rooms are only ever created in response to a user request; group admins do not create rooms unprompted. |
| FR-GA3 | A group admin shall be able to edit the name/description of an existing chat room. | Allows correction of typos made when the room was first proposed/created. |
| FR-GA4 | A group admin shall be able to promote an existing group member to group admin, and demote another group admin (if more than one exists). | A group must always retain at least one group admin, so a sole admin cannot demote themselves without first promoting a replacement. |
| FR-GA5 | A group admin shall be able to ban a user from their specific group. | A ban must be based on a user report rather than issued arbitrarily, and an admin cannot approve their own ban request. Group bans are permanent (no un-ban), though the user may create a new account. |
| FR-GA6 | A group admin shall be able to request that the super admin permanently delete a user from the entire system. | This system-wide ban/deletion is final and the associated email can never be reused. |
| FR-GA7 | A group admin shall be able to request that the super admin delete their group. | A group cannot delete itself outright; deletion always routes through super admin approval. |
| FR-GA8 | Group membership shall be automatically revoked for any existing member who falls below a group's age limit after it is raised. | Enforced immediately when the age limit is changed, not just for new join requests. |
| FR-GA9 | A group admin shall be able to view the full list of current and banned members for their own group. | Visibility is restricted to that single group; a group admin cannot see a user's membership in other groups. |
| FR-GA10 | A visual indicator shall show when a chatting user is a group admin for that group. | Displayed alongside their name/messages in the chat room. |

### Super Admin

| ID | Functional Requirement | Assumption |
|---|---|---|
| FR-SA1 | The system shall support exactly one super admin account. | The super admin account cannot be deleted and is seeded/created outside the normal registration flow. |
| FR-SA2 | The super admin shall approve or reject user requests to create a new group. | The super admin only actions requests; they do not create groups directly on their own initiative. |
| FR-SA3 | The super admin shall approve group-deletion requests submitted by a group admin. | Deletion always originates from the group admin; the super admin cannot unilaterally delete a group. |
| FR-SA4 | The super admin shall be able to permanently ban/delete a user from the system, acting on a group admin's request. | If the user being removed is a group admin, a replacement admin must be assigned first so their group is never left without one. |
| FR-SA5 | The super admin shall have access to an audit log of system actions (group creation/deletion, bans, deletions, etc.), filterable by type and ordered by date. | Provides accountability/traceability for all privileged actions taken in the system. |
| FR-SA6 | The super admin shall not be able to send direct messages to regular users. | The super admin role is administrative only and does not participate in chat. |

