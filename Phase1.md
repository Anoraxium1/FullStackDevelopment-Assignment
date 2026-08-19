# Lachlan Barnett, s5438449, Thurday 9 - 11

Fabulari is a real-time chat application developed as part of the 3813ICT assignment, built on using systems such as Angular and Node.js powering live communication. Similar to platforms like WhatsApp or Discord, it allows users to exchange text and image messages, while supporting group structures for organising conversations. The application also includes adminstrative functionality, allowing privileged users to manage tasks such as adding new groups, deleting groups, modifying description and names of groups and much more. Development follows a git workflow, with frequent commits to demonstrate the project's progress from initial design through to full implementation across its two phases.


The branching strategy will follow GitFlow, using "main" and "develop" as the two core branches. The "main" branch will hold the finalised, submission-ready state of the project (including the report and documentation), while "develop" will act as the testing branch for ongoing work and upcoming features.


Commit messages will contain a concise summary of what the commit does, so that the project history can be easily read to understand progress without needing to interpret commit messages. Commits will be kept small and frequent, with each commit representing a single logical change such as adding a feature, fixing a bug, or updating documentation, rather than bundling multiple unrelated changes together.


## Specifications and Assumptions (Functional Requirements)

The below summarises the functional requirements for Fabulari, derived from the client Q&A session, alongside the assumptions made where the specification was unclear, or left to developer choice.


### System / General

| ID | Functional Requirement | Assumption |
|---|---|---|
| 1 | The system shall support real-time delivery of messages between users in the same chat room. | Implemented using a WebSocket-based connection (Node.js) so messages appear live without a page refresh. |
| 2 | Users shall register their own account with an email, password, and profile details. | No OAuth/social sign-up; accounts are created directly through the app, and email doubles as the unique identifier. |
| 3 | Passwords shall be hashed before being stored. | No further password security (e.g. 2FA, password complexity rules) is required beyond hashing, per the client's "no specific cyber security" answer. |
| 4 | Users shall be able to change their password by entering their old password once and their new password twice. | The server verifies the old password against the stored hash and confirms the two new password entries match before updating. |
| 5 | There is no automated password-reset/recovery flow. | If a user forgets their password, they must create a new account, as stated directly by the client. |
| 6 | Users shall be able to toggle the UI between light and dark mode. | Theme preference is a personal display setting, separate from a group's colour theme. |
| 7 | The application shall be usable on desktop/PC as the primary target. | Tablet responsiveness is treated as a bonus/stretch goal; no mobile app or mobile-optimised layout is required. |
| 8 | Users shall be able to attach an image to a message. | Only PNG images are accepted, with a maximum file size of 2MB, per the client's stated limits. |
| 9 | Groups shall not have a profile picture. | Confirmed directly by the client; a group's identity is conveyed through its name, description, and colour theme only. |
| 10 | Links shared in messages shall be displayed as plain text, not clickable hyperlinks. | Reduces exposure to malicious/external links. |
| 11 | Chat rooms only persist the 5 most recent messages once a user leaves and rejoins. | While a user is actively in a room during a session they see the full session history; on rejoining later, only the last 5 stored messages are shown. |

### Users / Members

| ID | Functional Requirement | Assumption |
|---|---|---|
| 12 | Users shall be able to view a list of all existing groups in the system. | Visibility is not restricted by a group's age limit; a user can see a group even if they are too young to join it. |
| 13 | Users shall be able to request to join a group. | If the user does not meet the group's minimum age requirement, the join request is automatically rejected. |
| 14 | Users shall be able to request that a new group be created, supplying the title, description, age limit, and colour theme with the request. | The request is sent to the super admin, who creates the group on the user's behalf; the requester becomes the group's default group admin. |
| 15 | Users shall be able to propose a new chat room within a group they are a member of. | The proposal is reviewed by a group admin, who may approve or reject it; a rejection must include a reason. Once submitted, a request cannot be cancelled. |
| 16 | A group is not required to have any chat rooms. | Confirmed directly by the client; a group may have 0 or unlimited rooms, so the UI must handle an empty room list. |
| 17 | Users shall be able to view their own pending and past-rejected room requests. | Approved requests simply appear as new rooms; there is no separate "approved requests" history to review. |
| 18 | Users shall be able to send text messages and (PNG) image messages within a chat room they belong to. | No voice messages, GIFs, or other file types are supported. |
| 19 | Users shall be able to see who else is currently present in a chat room, and receive a notification when someone joins or leaves. | Presence is scoped to the room the user is actively viewing. |
| 20 | Users shall have a profile page, editable by themselves, including an optional profile photo. | All profile fields are editable except the email address, which is the account's unique identifier. Profiles are private and not viewable by other users. |
| 21 | Messages shall display a timestamp and the sender's profile photo. | The client confirmed no reply/threading feature; editing or deleting a sent message was not explicitly addressed either way, so it is assumed unsupported for Phase 1, consistent with the fixed 5-message history model above. |
| 22 | Users shall be able to leave a group at any time. | Leaving a group does not delete the user's account, only their membership of that group. |

### Group Admin

| ID | Functional Requirement | Assumption |
|---|---|---|
| 23 | A group admin shall be able to edit their group's description, age limit, and colour theme. | Per the client's later clarification, the group's name cannot be changed once created, even by its group admin. |
| 24 | A group's colour theme shall apply to all chat rooms within it. | Confirmed directly by the client; individual chat rooms do not have their own independent theme setting. |
| 25 | There is no limit to the number of groups a single user can be a group admin of. | Confirmed directly by the client; a user may hold the group admin role in multiple groups at once. |
| 26 | A group admin shall be able to approve or reject user-submitted chat room requests, supplying a reason for any rejection. | Chat rooms are only ever created in response to a user request; group admins do not create rooms unprompted. |
| 27 | A group admin shall be able to edit the name/description of an existing chat room. | Allows correction of typos made when the room was first proposed/created. |
| 28 | A group admin shall be able to promote an existing group member to group admin, and demote another group admin (if more than one exists). | A group must always retain at least one group admin, so a sole admin cannot demote themselves without first promoting a replacement. |
| 29 | A group admin shall be able to ban a user from their specific group. | A ban must be based on a user report rather than issued arbitrarily, and an admin cannot approve their own ban request. Group bans are permanent (no un-ban), though the user may create a new account. |
| 30 | A group admin shall be able to request that the super admin permanently delete a user from the entire system. | This system-wide ban/deletion is final and the associated email can never be reused. |
| 31 | A group admin shall be able to request that the super admin delete their group. | A group cannot delete itself outright; deletion always routes through super admin approval. |
| 32 | Group membership shall be automatically revoked for any existing member who falls below a group's age limit after it is raised. | Enforced immediately when the age limit is changed, not just for new join requests. |
| 33 | A group admin shall be able to view the full list of current and banned members for their own group. | Visibility is restricted to that single group; a group admin cannot see a user's membership in other groups. |
| 34 | A visual indicator shall show when a chatting user is a group admin for that group. | Displayed alongside their name/messages in the chat room. |

### Super Admin

| ID | Functional Requirement | Assumption |
|---|---|---|
| 35 | The system shall support exactly one super admin account. | The super admin account cannot be deleted and is seeded/created outside the normal registration flow. |
| 36 | The super admin shall approve or reject user requests to create a new group. | The super admin only actions requests; they do not create groups directly on their own initiative. |
| 37 | The super admin shall approve group-deletion requests submitted by a group admin. | Deletion always originates from the group admin; the super admin cannot unilaterally delete a group. |
| 38 | The super admin shall be able to permanently ban/delete a user from the system, acting on a group admin's request. | If the user being removed is a group admin, a replacement admin must be assigned first so their group is never left without one. |
| 39 | The super admin shall have access to an audit log of system actions (group creation/deletion, bans, deletions, etc.), filterable by type and ordered by date. | Provides accountability/traceability for all privileged actions taken in the system. |
| 40 | The super admin shall not be able to send direct messages to regular users. | The super admin role is administrative only and does not participate in chat. |