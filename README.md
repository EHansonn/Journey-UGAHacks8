
# Journey

A social media site to share and plan your journeys, and connect with people who are locals at the places you plan to visit. Create a profile, plan and share your trips, and discover others like you.

## Inspiration

Other social media sites are often used as platforms to share your travels, but they lack the ability to upload and share your travel experiences in a visual and organized manner.

## What it does

We built a social media platform that allows you to upload your past trips and plan future ones. We then present this data in an organized and visual form on your profile. Customize your trips by uploading images, selecting a date, location, and description. On your profile, you can see your trips on an interactive Google Maps window, which shows markers to indicate your travels. Users information, trips, and friends are stored in the database. Creating your profile and trips will connect you with others who share similar interests and travel plans. You can also view other users' trips and plans.

## How we built it

We used Typescript with NextJS as our framework. Our front-end is comprised of React and Tailwind while our backend was made up of SQL which was supported by Prisma, AWS, and Digital Ocean. Our database and deployment server resided on Digital Ocean as opposed to AWS due to having credits.

## Challenges we ran into

One challenge that was faced was getting valid location inputs that integrate with the Google maps API. To get around this problem, we integrated a predictive input that suggested locations that would function with the API.

## Accomplishments that we're proud of

One thing we're proud of is the SQL database we set up.
The styling and layout of the site are also something we're very proud of. The use of NextJS really allowed us to make out site feel very responsive and official.

## What we learned

The Google maps api is a really fun tool to use, that fits really well with the travel theme. Getting it to display all of the user's trips was a really fun challenge, that taught us a lot about SQL and React.
Designing and styling a whole app from scratch was a challenge, but the experience we gained during this hack will be very useful in the future.

## Whats next for Journey

To further add to the theme of helping users connect, adding a websocket to allow for chat between users would really help, as well as more opportunities for you to connect with others based other information.
The Trips schema could be updated so that you could plan your trips in more depth, and so that we could display more information on the map.
