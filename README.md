# Comp 4350 Assingment
This web app calls the Stackoverflow API and displays its information (_*Not complete_)  
Docker hub link: [https://hub.docker.com/r/aydemcodes/comp4350assignment](https://hub.docker.com/r/aydemcodes/comp4350assignment)

## How to run the program
1. Pull the image from Docker hub using the command `docker pull aydemcodes/comp4350assignment:app`
2. Run the container, while binding port `3000` with the command `docker run -d -p 3000:3000 aydemcodes/comp4350assignment:app`
3. Now open [https://localhost:3000](https://localhost:3000)

## How it works
1. Once on the website you can type a tag in the search, then submit
2. A list of 10 most recent responses will apear, clicking on them will direct you to the original post.
