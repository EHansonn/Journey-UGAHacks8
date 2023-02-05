
# Journey

A social media site to share and plan your journeys, and connect with people who live at the places you plan to visit. Create a profile, plan and share your trips, and discover others like you.

## Inspiration

Other social media sites are often used as a platform to share your travels, but they lack the ability to upload and share your travel experiences in an organized manner.

## What it does

We built a social media platform that allows you upload your past trips and plan future ones. We then present this data in an organized and visual form on your profile. Customize your trips by uploading images, selecting a date, location, and a description. On your profile you can see your trips on a interactive Google Map, that shows markers to indicate your travels. Selecting your current location and trips will connect you with others who share similar interests and travel plans.

## How we built it

We used Typescript with NextJS as our framework. Our front-end comprised of React and Tailwind while our backend was made up of SQL which was supported by Prisma, AWS, and Digital Ocean. Our database and deployment server resided on Digital Ocean as opposed to AWS due to having credits.

## Challenges we ran into

One challenge that was faced was getting valid location inputs that integarte with the Google maps api. To get around this problem, we integrated a predictive input that suggested locations that would function with the api.

## Accomplishments that we're proud of

One thing we're proud of is the SQL database we set up.

## What we learned

The Google maps api a really fun tool to use, that fits really well with the travel theme.
Designing and styling a whole app from scartch was a challenge, and the experience we gained during this hack will be very userful in the futre.

## Whats next for Journey

To further add to the theme of helping users connect, adding a websocket to allow for chat between users would really help.
