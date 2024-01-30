# Grayce developer take-home exercise

As part of our interview process, we ask candidates to do an at-home coding exercise. The goal is not to have you spend a huge amount of time but to let us see the type of work you produce with your normal set of tools and without the pressure of an interview. We will also be doing blind grading to reduce the chance of bias in our evaluations. Please complete the work on your own.

## Exercise

Grayce employs a team of Care Partners whose job is to assist our members. When a new member signs up for Grayce, we need to match them to a Care Partner so they can begin their interactions in the app with an assistant already assigned to them. For this exercise, your job is to form those matches. The data you need is in these two JSON files:

- A list of members who are signing up
  [members.json](https://prod-files-secure.s3.us-west-2.amazonaws.com/551cef74-fabc-49ff-86d2-91451585b96e/54d2b619-a88d-42b9-b285-f60abbd431f1/members.json)
- The list of Care Partners
  [care_partners.json](https://prod-files-secure.s3.us-west-2.amazonaws.com/551cef74-fabc-49ff-86d2-91451585b96e/3af9077c-be2c-48b2-8456-8c89f21d4128/care_partners.json)

Each file contains information you can use to make the matches. Some terminology used in the data that you may need:

- The caregiver is the user who signed up for Grayce
- The care recipient is the loved one who the caregiver is taking care of. For example, this might be the elderly parent of the caregiver.
- The caregiver and care recipient might be in different locations. It’s possible there is some goofy data where the care recipient is “self” but the locations are different, you don’t need to do anything special in this case.
- Care Partners have new members assigned to them over time, and those members tend to have their problem solved and then become inactive. The active case count for Care Partners is the number of members who are demanding their attention now, but the total case count is also included. It is possible for inactive members to return with a new situation.

You should write code that:

- Reads in the data files
- Forms a match for each member based on any criteria you devise
- Writes a new JSON file with an entry for each member in the format: `{ member_id: "XXX", care_partner_id: "YYY" }` Here’s an example output file:
  [sample_output.json](https://prod-files-secure.s3.us-west-2.amazonaws.com/551cef74-fabc-49ff-86d2-91451585b96e/a3ec8989-e99f-48e7-bbd1-d6888ad8fce9/sample_output.json)

Your solution can be written in any language. You[r](https://www.notion.so/01575cc4b92d4c33a67f2424716881bb?pvs=21) submission should include:

- Your source code,
- The output JSON file, and
- Brief instructions for how to run your code

Please email the completed solution to [aubrey@withgrayce.com](mailto:aubrey@withgrayce.com). You can also reach me there if you run into any issues or have questions. Once we receive your solution, we’ll evaluate it ASAP and get back to you with next steps.

Thanks so much for taking the time to work on this!!
