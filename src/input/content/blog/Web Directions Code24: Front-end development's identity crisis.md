---
title: "Web Directions Code24: Front-end development's identity crisis"
stage: complete
tags:
  - Talks
  - Working
  - Web Design
created: 2024-06-19
modified: 2024-06-19
syndication-url: ""
---

This is a more accessible and self hosted version of [my publicly available slides on Notist](https://noti.st/ellyloel/0kzRrD/slides).

## Slide 1

![](./src/assets/img/wdc24-slides/0.jpg)

### Quick introduction

Hi, I’m Elly Loel, my pronouns are she/her.

I’m a tall white trans woman with blonde hair.

<div style="width: 50%;">
	{% image "./src/assets/img/pfp.jpg", "A digital drawing of me smiling and holding up a peace sign with my hands, wearing a white “Golf le Fleur” jumper." %}
</div>

## Slide 2

![](./src/assets/img/wdc24-slides/1.jpg)

### Front-end developments identity crisis

So this afternoon I’m going to be talking to you about Front-end developments identity crisis.

## Slide 3

![](./src/assets/img/wdc24-slides/2.jpg)

### What would you call someone who:

- Builds accessible and usable UIs
- Uses HTML, CSS, and 🤏🏼 JS
- Collaborates with designers, developers, and testers

## Slide 4

![](./src/assets/img/wdc24-slides/3.jpg)

### Same question, but doesn't:

- Develop and optimise application logic
- Integrate data sources and services
- Ensure performance and functionality with tests
- Manage JS tooling and infrastructure

There seems to be some confusion about what exactly this role is. So, let’s work through it by looking at some of my experiences.

## Slide 5

![](./src/assets/img/wdc24-slides/4.jpg)

### I’m not a full-stack developer, regardless of what my last job title says

## Slide 6

![](./src/assets/img/wdc24-slides/5.jpg)

### I’m not even a front-end developer, thanks to the JavaScript–industrial complex

## Slide 7

![](./src/assets/img/wdc24-slides/6.jpg)

### I’m a front-of-the-front-end developer, but that’s too long

## Slide 8

![](./src/assets/img/wdc24-slides/7.jpg)

### So, I’m a web designer

## Slide 9

![](./src/assets/img/wdc24-slides/8.jpg)

### 🫠

_sigh_ 😮‍💨 wooh!

## Slide 10

![](./src/assets/img/wdc24-slides/9.jpg)

### That was densely packed, so let’s break it down

## Slide 11

![](./src/assets/img/wdc24-slides/10.jpg)

### I’m not a full-stack developer, regardless of what my last job title says

## Slide 12

![](./src/assets/img/wdc24-slides/11.jpg)

I know how to do full-stack development, not because I wanted to but because I had to.

## Slide 13

![](./src/assets/img/wdc24-slides/12.jpg)

My title was “developer” and so was everyone else’s.

## Slide 14

![](./src/assets/img/wdc24-slides/13.jpg)

According to our titles there were no front-end or back-end developers. We had to do it all.

## Slide 15

![](./src/assets/img/wdc24-slides/14.jpg)

This led to lots of [bad HTML and CSS](https://htmhell.dev/10-section-is-no-replacement-for-div/) from back-end developers.

Image description: An example of bad HTML code, similar to the usual div soup there is many nested elements but instead of `div`s they are seemingly arbitrarily chosen `section`s or `article`s.

## Slide 16

![](./src/assets/img/wdc24-slides/15.jpg)

And lots of bad Node and PHP from front-end developers.

Image description: An example of bad PHP code, there is a function called `isEven` that has a seemingly infinite number of if statements that each check a single number return either true or false.

## Slide 17

![](./src/assets/img/wdc24-slides/16.jpg)

> “HTML, CSS, JavaScript, Python, C#, and SQL may all be code, but they’re really quite different kinds of code and are suited to different kinds of people.”

— _Heydon Pickering_ in [Reluctant Gatekeeping: The Problem With Full Stack](https://medium.com/@Heydon/reluctant-gatekeeping-the-problem-with-full-stack-e9ad836570f6)

## Slide 18

![](./src/assets/img/wdc24-slides/17.jpg)

> “The value you want from a CSS expert is their CSS, not their JavaScript, so it’s absurd to make JavaScript a requirement.”

— _Heydon Pickering_ in [Reluctant Gatekeeping: The Problem With Full Stack](https://medium.com/@Heydon/reluctant-gatekeeping-the-problem-with-full-stack-e9ad836570f6)

## Slide 19

![](./src/assets/img/wdc24-slides/18.jpg)

Just because I know how to use Docker, Node.js, PHP, SQL, AWS, Linux, Serverless, CI/CD, etc. doesn’t mean I should have to.

Image description: A cloud of logos for all the aforementioned back-end/DevOps things.

## Slide 20

![](./src/assets/img/wdc24-slides/19.jpg)

Please let me do what I’m good at!

## Slide 21

![](./src/assets/img/wdc24-slides/20.jpg)

### I’m not even a front-end developer, thanks to the JavaScript–industrial complex

## Slide 22

![](./src/assets/img/wdc24-slides/21.jpg)

In this section whenever I refer to React please feel free to replace it with any of the following:

- Next.js (what people mean when they say React)
- Tailwind (what people mean when they say CSS)
- Webpack
- CSS-in-JS
- TypeScript
- etc.

Image description: A cloud of logos for all the aforementioned frameworks/tools.

## Slide 23

![](./src/assets/img/wdc24-slides/22.jpg)

I came into the industry during the reign of React, I know React well. It was all I knew for a while.

## Slide 24

![](./src/assets/img/wdc24-slides/23.jpg)

I rushed past HTML and CSS on my way to learning React. I didn’t understand they were the main building blocks of the web.

Image description: A highway sign that shows HTML & CSS straight ahead and React this exit, the car is drifting along the curved exit ramp at high speed with its wheels smoking.

## Slide 25

![](./src/assets/img/wdc24-slides/24.jpg)

I hate it. There are so many things wrong with React. The cult surrounding it, the company making it, its countless footguns, its bloat, its incompatibility with web platform features—the list goes on.

Image description: A 70’s cartoon style drawing of an anthropomorphic cat and dog with their arms around each other smiling and waving at the viewer. Below them the text:
BORN TO WEB
INDUSTRY IS A FUCK
鬼神 Kill Em All 2024
I am web designer
410,757,864,530 REACT DEVS

## Slide 26

![](./src/assets/img/wdc24-slides/25.jpg)

> “Not only are new services being built to a self-defeatingly low UX and performance standard, existing experiences are pervasively re-developed on unspeakably slow, JS-taxed stacks.”

— _Alex Russell_ in [The Market for Lemons](https://infrequently.org/2023/02/the-market-for-lemons/)

## Slide 27

![](./src/assets/img/wdc24-slides/26.jpg)

Even if I didn’t have issues with it I should still be able to choose not to use it, right?

## Slide 28

![](./src/assets/img/wdc24-slides/27.jpg)

Wrong, sorry! There is no choice anymore, I can’t escape it. React is so pervasive that almost every job is using it. On the rare occasion that they’re not using it, they’re using something like it.

Image description: The white guys selfie meme featuring eight men sitting next to each other, tilting to fit into the photo, resembling the golden ratio. In front of each of their faces is the logo of a different JavaScript framework.

## Slide 29

![](./src/assets/img/wdc24-slides/28.jpg)

Okay, so I can’t escape React but surely I could just work on something that doesn’t touch React. Like for example, CSS!

## Slide 30

![](./src/assets/img/wdc24-slides/29.jpg)

Oh wait, no. That’s all done with CSS modules, CSS-in-JS, Tailwind, or whatever the next new way they come up with to write CSS without actually writing CSS.

Image descriptions:

1. The Uno Draw 25 cards meme, the text on the Uno card says “Write CSS or draw 25”. The next frame shows a guy sitting there holding 25 cards looking indignant.
2. A cloud of logos for styling tools and frameworks.

## Slide 31

![](./src/assets/img/wdc24-slides/30.jpg)

If you can’t beat ‘em, join ‘em, I guess? 🤷🏼‍♀️

## Slide 32

![](./src/assets/img/wdc24-slides/31.jpg)

The issue is, React—like the supermassive black hole it is—pulls everything towards it. Towards more JavaScript. I start out only touching the HTML, CSS, and a bit of JavaScript for DOM manipulation. But before I know it I’m in there making API calls, transforming data, and writing middleware.

Image description: Heaviest Objects in the Universe meme, from lightest to heaviest: Sun, Neutron star, Black hole, and React.

## Slide 33

![](./src/assets/img/wdc24-slides/32.jpg)

Yikes! I need some separation of my concerns.

## Slide 34

![](./src/assets/img/wdc24-slides/33.jpg)

I went a bit off topic here but what I’m getting at is this. Actual front-end work has been devalued.

## Slide 35

![](./src/assets/img/wdc24-slides/34.jpg)

It isn’t treated as enough to be a full-time job.

## Slide 36

![](./src/assets/img/wdc24-slides/35.jpg)

It’s gotten to the point that now front-end no longer actually means front-end.

## Slide 37

![](./src/assets/img/wdc24-slides/36.jpg)

The duties of a front-end developer are more accurately described as full-stack. And as we learnt earlier, there are many issues with full-stack development as a concept. I don’t want to be a full-stack developer.

## Slide 38

![](./src/assets/img/wdc24-slides/37.jpg)

So, I must be something else?

## Slide 39

![](./src/assets/img/wdc24-slides/38.jpg)

### I’m a front-of-the-front-end developer?

Well, according to Brad Frost, I’m a front-of-the-front-end developer… While those words do accurately describe what I do…

## Slide 40

![](./src/assets/img/wdc24-slides/39.jpg)

They’re way too long. No-one is actually going to use that as their title. So we need something shorter that still conveys the same meaning.

Image description: A screenshot of my LinkedIn profile with everything blurred out except the job title section. The text reads “Front-of-the-front-end De…”

## Slide 41

![](./src/assets/img/wdc24-slides/40.jpg)

People have come up with new titles, like:

## Slide 42

![](./src/assets/img/wdc24-slides/41.jpg)

UX engineer

## Slide 43

![](./src/assets/img/wdc24-slides/42.jpg)

Design engineer

## Slide 44

![](./src/assets/img/wdc24-slides/43.jpg)

And, I’ve actually even seen some companies using them! Though… I’ve also seen companies misusing them, for “front-end” (aka full-stack) roles—which undermines the whole point of coming up with these new titles.

Image description: A meme from The Office, there are two pieces of paper, one says “Full-stack developer” the other says “Design engineer”, the caption says “We need you to find the differences between these two pictures”. Below that Pam with the caption “They’re the same picture”.

## Slide 45

![](./src/assets/img/wdc24-slides/44.jpg)

Also, there seems to be a bit of an obsession with having “engineer” in the title. I’d say that mostly stems from pay related anxiety. But it’s probably also somewhat tied up in the perception that anything that’s not engineering is not as important.

Image description: The engineer from TF2 with an extremely long neck looking at the text on this slide in disappointment.

## Slide 46

![](./src/assets/img/wdc24-slides/45.jpg)

No. You shouldn’t shove engineer into your title so you get paid more. You should help make sure everyone without engineer in their title gets paid more. We all deserve more.

Image description: The hard to swallow pills meme, the text above the pills says “You shouldn’t have to be an engineer to be paid your worth”.

## Slide 47

![](./src/assets/img/wdc24-slides/46.jpg)

Look! Here are some titles that don’t include engineer.

- Web Mistress 🧑‍💻
- Web Witch 🧙
- Web Crafter 👷
- Web Artisan 🧑‍🎨
- Web Worker 🧑‍🔧
- Web Specialist🧑‍💼

## Slide 48

![](./src/assets/img/wdc24-slides/47.jpg)

I don’t hate the other titles; for a while there I was even using design engineer to describe myself. But, there’s a better option that’s been around since long before even “Front-end developer” was being used. We had the right title in front of us all along…

## Slide 49

![](./src/assets/img/wdc24-slides/48.jpg)

### I’m a web designer

## Slide 50

![](./src/assets/img/wdc24-slides/49.jpg)

Okay, so why do I think that web designer is the best title?

## Slide 51

![](./src/assets/img/wdc24-slides/50.jpg)

Because, I’m a designer and the web is my medium.

## Slide 52

![](./src/assets/img/wdc24-slides/51.jpg)

I’m designing _for_ the web. The infinitely flexible web. The web that doesn’t have one screen size, one browser, one operating system, or one device. The web that can be used by anyone, anywhere, on any internet connection, on any device, on any operating system, on any browser, with any screen size.

## Slide 53

![](./src/assets/img/wdc24-slides/52.jpg)

I’m designing _with_ the web. Using the web platform (HTML, CSS, JS, ARIA, etc.), not a bloated harmful abstraction. I have a deep understanding of HTML and its semantics. I love CSS, I know how and when to utilise its many features, and I keep up-to-date as more are added. I have a strong understanding of modern JavaScript and most importantly I know when not to use it.

## Slide 54

![](./src/assets/img/wdc24-slides/53.jpg)

### Why does this matter?

## Slide 55

![](./src/assets/img/wdc24-slides/54.jpg)

In the current state of our industry we’re being forced to do too many things. We’re spread too thin. It’s completely unsustainable which is why we’re constantly burning out.

## Slide 56

![](./src/assets/img/wdc24-slides/55.jpg)

We’re forced to do the wrong things which leads to bad outcomes and that’s not okay. Bad code is often some or all of the following:

## Slide 57

![](./src/assets/img/wdc24-slides/56.jpg)

Non-functional, so it doesn’t work at all.

Image description: The Google Chrome failed to load site sad document face.

## Slide 58

![](./src/assets/img/wdc24-slides/57.jpg)

Inoperable/Inaccessible, so it can’t be used by some or all people.

Image description: The two button meme but both buttons are unlabelled.

## Slide 59

![](./src/assets/img/wdc24-slides/58.jpg)

Or unusable, so it’s too hard to be used by some or all people.

Image description: A screenshot of [userinyerface.com](https://userinyerface.com/) with popups covering the entire screen.

## Slide 60

![](./src/assets/img/wdc24-slides/59.jpg)

### Okay, so… what now?

## Slide 61

![](./src/assets/img/wdc24-slides/60.jpg)

First and foremost, don’t give up! Even through the current landscape of front-end development presents challenges for us web designers we owe it to the people using our sites to not give in to the status quo.

## Slide 62

![](./src/assets/img/wdc24-slides/61.jpg)

You deserve better than being continuously overworked to the point of burnout before being unceremoniously laid off by some short sighted greedy CEO. So, you should go and read “[You deserve a tech union](https://abookapart.com/products/you-deserve-a-tech-union)” by Ethan Marcotte. Then, join a union and fuck capitalism.

## Slide 63

![](./src/assets/img/wdc24-slides/62.jpg)

BUT if I were to put my stinky capitalist hat on for a second 🤢 Inaccessible or unusable websites do mean that you’re going to have less people using your site. So, you’re going to be making less money than if your site was accessible and usable. Okay, capitalist hat back off, what else?

## Slide 64

![](./src/assets/img/wdc24-slides/63.jpg)

Advocate for preventing overwork. So basically, abolish full-stack roles where you’re spread too thin.

## Slide 65

![](./src/assets/img/wdc24-slides/64.jpg)

Advocate for more specialised roles.

## Slide 66

![](./src/assets/img/wdc24-slides/65.jpg)

Advocate for better quality.

## Slide 67

![](./src/assets/img/wdc24-slides/66.jpg)

Advocate for care. Care for our craft. And most importantly, care for the people using our sites.

## Slide 68

![](./src/assets/img/wdc24-slides/67.jpg)

Also, we should start changing how we refer to ourselves. Whether it be when you’re talking to co-workers—or even friends and family, on your personal website, on LinkedIn, on your resume and CV, everywhere!

## Slide 69

![](./src/assets/img/wdc24-slides/68.jpg)

Once you’ve changed how you’re referring to yourself then it’ll be much easier to change how others refer to you. It might not be easy, but it will be easier. Talk to your manager, see if you can change how they refer to you, both officially and unofficially. If you can get your title changed that’s amazing. If not you should still absolutely be able to get everyone to change how they refer to basically everywhere with the only exception being things like official documents.

## Slide 70

![](./src/assets/img/wdc24-slides/69.jpg)

Now I’m talking to the people who make these decisions. Yes, you! 🫵🏼 You need to make sure this change happens. You are the ones with the power to improve our current situation. If you need to, make any and all changes that are needed to make this change happen. Do whatever you can! Change the role titles. Change the team or department names. Update your job ads so titles and descriptions are accurate. And most importantly, if someone is in fact doing 2 or 3 jobs give them 2 or 3 titles and pay them 2 or 3 salaries!

## Slide 71

![](./src/assets/img/wdc24-slides/70.jpg)

Thank you so much for listening everyone! You can scan that QR code or head to the link [ellyloel.com](https://www.ellyloel.com/) to head to my website where you can also find links to all my other socials.

Image descriptions:

1. A digital drawing of me in the style of a Club Penguin character sitting on the ground in front of a laptop.
2. A digital drawing of me side on with headphones on sitting at my desk in front of a keyboard and monitor. In between my head and the monitor is a QR code and below that text that reads: “ellyloel.com”.
