# The Science Quiz

The Science Quiz is an online game based on the popular TV quiz, Who Wants to Be a Millionaire.

The game aims to inspire people to take an interest in science and the natural sciences in particular, from chemistry to physics, biology, geology, climate and more.

Each game consists of a series of questions. Players gain points with each correct answer, with a maximum score of one million points, but if they answer incorrectly the game immediately ends. Players can get help if they run into a difficult question, by pressing the 50/50, Phone a Scientist and Ask the Internet buttons.

![The Science Quiz shown on multiple screen sizes](/docs/responsive-screenshots.png)

## User Experience Design

The user experience was designed using the "five planes" method.

### Strategic Plane

#### Site Goals

- Primary goal:
  - To inspire one million people to take an interest in the natural sciences
- Secondary goals:
  - To present science as fun, fascinating and challenging
  - To promote science through an engaging, enjoyable and accessible game
  - To provide visitors with links to respected science-related resources

#### User goals

- Primary goal:
  - To play a fun game
- Secondary goals:
  - To find out how much they know about natural science topics
  - To learn some new scientific-related facts about the world

### Scope Plane

#### User stories

1. As a user, I want to see a visually appealing website that looks good on various screen sizes and is easy to navigate, so I'm not put off by a poor user experience.
1. As a user, I want to play a game that is fun, challenging and educational.
1. As a user, I want to be able to read the game’s instructions so I know how to play.
1. As a user, I want clear feedback when I interact with the game, so I know how well (or badly) I’m doing.
1. As a user, I want to see links to educational resources so I can learn more about the natural sciences.

### Structure Plane

To fulfil the user stories, the site has various sections:

- Game title
- Welcome message
- Instructions
- The Game
- End-game message
- Buttons (various)
- Resource links

The site has a single page, with the sections listed above either visible or hidden based on which one of four “modes” the site is in: (1) Welcome, (2) Instructions, (3) Game and (4) End-Game.

![Structure diagram](docs/structure-diagram.png)

### Skeleton Plane

Wireframes were developed for each of the site's four "modes" and for the three main screen sizes (mobile, tablet, desktop).

#### Mobile Wireframes

![Mobile wireframes](docs/wireframes/mobile-wireframes.png)

#### Tablet Wireframes

![Tablet Wireframes](docs/wireframes/tablet-wireframes.png)

#### Desktop Wireframes

![Desktop Wireframes](docs/wireframes/desktop-wireframes.png)

### Surface Plane

#### Colour palette

The site's colour palette is based on a visually striking background image that looks like a ball or energy or a neuron firing.

- #af538c (a shade of pink) is the primary colour
- #3a5172 (a shade of slate grey) is the secondary colour
- #fff (white) is used for text
- #333 (dark grey) is for shadows

The game also uses three contrasting colours to provide feedback to the user; for example, when the user answers a questions correctly or incorrectly.

- #00c8a1 (a shade of green)
- #0080f9 (a shade of blue)
- #d45179 (a shade of red)

#### Custom fonts

The site uses two custom fonts from [Google Fonts](https://fonts.google.com/).

- [Audiowide](https://fonts.google.com/specimen/Audiowide): Used for headings
- [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans): Used for all other text

#### Images

The main background image was chosen for its striking portrayal of a biological or electrical event, which will hopefully inspire users to take an active interest in science.

#### Content

As a simple quiz game, the site has very little in the way of written content, other than the quiz's questions and answers. These questions and answers are loaded from a freely available web API.

- [Open Trivia Database](https://opentdb.com/)
- [Open Trivia Database API URL generator](https://opentdb.com/api_config.php)
- [API URL used by the game](https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple)

