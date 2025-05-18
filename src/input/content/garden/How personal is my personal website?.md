---
title: how personal is my personal website?
tags:
  - Seedling
  - Notes
  - Why you need a personal website
  - Self expression
created: 2025-05-18
modified: 2025-05-18
id: 1940d83aadd9901986d3dec6e5ea6d62
date: 2025-05-18
---
~~~ callout _to be read as a conversation with my brain_
~~~

i feel very strongly that my personal website should be **personal**. it should be about me. it shouldn't just be my professional mask, it should be all of me.

## but is it?

_welllll…_ kinda,,, but no, not really. not as much as i might like to think it is.

it's not a soulless superficial professional "personal" website&trade;. but it's also not really _all_ of me. and i want it to be **all** of me.

i think i'm subconsciously censoring myself for the sake of my perceived (or maybe imagined?) audience.

as much as i like the idea of being open about everything, i think the reality of it in the context of a personal website is scarier than i thought it would be.

_that's kinda interesting._

i don't find it scary on social media or even in person honestly. on social media it feels like i can more easily blend in bc i'm not the only one up on stage. and in person—sometimes on socials too—i can gauge vibes and then match their freak.

i figured this out when i was thinking about why i don't really post that much. why i only really post about web related topics.

i love the web. but i also love other things.
so why do i feel like i can only post about the web here?

## why tho?

i think my subconscious believes my audience only wants web-related posts.

but, like, if that were true—if my audience wanted _solely_ web-related posts—there are plenty of other amazing sources they could go to for that. they wouldn't be here if that's all they were after.

they're _here_ for me.

so maybe i should give them what they want.
especially because, like i said earlier, i really like the idea of being open about everything. the more i share the more i'm able to connect with similar people. _tho it seems most other autistic trans puppygirls in tech are into rust or sysadmin not css lol._

<h2 class="[ grid gap-3 ]" style="grid-template-columns: 1.5fr minmax(0, 2fr);">
	<em id="you-should-know-this-too" class="[ stroke ]">you should know this too!</em>
	<video controls autoplay loop muted playsinline src="/assets/img/you-should-know-this-too.mp4"></video>
</h2>

let me know if you're a star wars lore nerd, a fan of anime & cartoons & animation of all types, a devout worshiper of yuri & GL, a lover of puppygirls, furries, the quirky and the kinky. **let's embrace the full spectrum of what makes us unique and unapologetically ourselves.**

<div>
  <button type="button" id="randomiseButton">
    {%- inlineIcon "fas:shuffle" -%}
    <span>shuffle the silly shit</span>
  </button>
  <button type="button" id="pauseAllButton">
    {%- inlineIcon "fas:play" -%}
    {%- inlineIcon "fas:pause" -%}
    <span>pause all videos</span>
  </button>
</div>
<div id="media-wall" class="[ flow ]"></div>

<script type="module">
const recentlyShown = new Set();
const RECENT_HISTORY_SIZE = 300;

const mediaFiles = [
  { type: "image", index: 0, alt: "I bring a sort of “being a dog” vibe to the gender that that humans don't really like." },
  { type: "image", index: 1, alt: "A quick sketch of me Brodie did in pen." },
  { type: "image", index: 2, alt: "A lil cat drinking a pink monster can “glug glug”." },
  { type: "image", index: 3, alt: "A lil cat sitting at a laptop, the screen says “boobs”." },
  { type: "image", index: 4, alt: "A puppy girl wearing a shirt that says “autistic by birth, dog girl by the grace of god”." },
  { type: "image", index: 5, alt: "Calypso from Bluey." },
  { type: "image", index: 6, alt: "Ralsei lying face down on the floor." },
  { type: "image", index: 7, alt: "A lil cat with a raised eyebrow saying “queer”." },
  { type: "image", index: 8, alt: "A lil dog and cat napping together." },
  { type: "image", index: 9, alt: "An absolutely tiny anthropomorphised dog." },
  { type: "image", index: 10, alt: "Miwa and Saeko smiling." },
  { type: "image", index: 11, alt: "" },
  { type: "image", index: 12, alt: "A heartwarming two-panel manga strip showing the sweet intimacy of Miwa and Saeko in separate beds but holding hands, then passed out, sleeping messily, but their connection remains, unbroken even in dreams." },
  { type: "image", index: 13, alt: "" },
  { type: "image", index: 14, alt: "" },
  { type: "image", index: 15, alt: "Saeko reacts with wide-eyed, comical shock and awe, exclaiming, “WHOAA... THAT'S SOME MAD CLEAVAGE!” as Miwa bends over, emphasizing a moment of playful, slightly flustered surprise." },
  { type: "image", index: 16, alt: "" },
  { type: "image", index: 17, alt: "" },
  { type: "image", index: 18, alt: "" },
  { type: "image", index: 19, alt: "Pure joy captured in motion as Miwa and Saeko, hands clasped tightly, run with delighted smiles, their energy palpable in the manga panel." },
  { type: "image", index: 20, alt: "" },
  { type: "image", index: 21, alt: "A quiet, pensive moment as Miwa, in pajamas, gazes with a serious, perhaps slightly weary, expression as Saeko enters the frame." },
  { type: "image", index: 22, alt: "A tender, simple line drawing captures the cozy intimacy of a dog and cat snuggled in sleep, dreaming sweetly of an even closer cuddle, a small heart symbolizing their affection." },
  { type: "image", index: 23, alt: "A vibrant manga scene contrasts two friends: Saeko bursts with exuberant energy, long hair flying as she throws her arms up in pure celebration, while Miwa, elegant in a patterned dress, offers a gentle, serene smile. A moment of shared joy against a cool blue." },
  { type: "image", index: 24, alt: "Miwa and Saeko share a moment of quiet contemplation, their expressions soft and thoughtful as they rest their chins in their hands, radiating a gentle, cozy vibe against a warm pink backdrop." },
  { type: "image", index: 25, alt: "" },
  { type: "image", index: 26, alt: "In a car, Miwa and Saeko sleep soundly, they're completely zonked out, Saeko is drooling on Miwa's boobs." },
  { type: "image", index: 27, alt: "" },
  { type: "image", index: 28, alt: "" },
  { type: "image", index: 29, alt: "" },
  { type: "image", index: 30, alt: "A close-up manga panel radiating warmth, as Miwa, with kind eyes and long dark hair, offers a soft, reassuring smile." },
  { type: "image", index: 31, alt: "" },
  { type: "image", index: 32, alt: "" },
  { type: "image", index: 33, alt: "" },
  { type: "image", index: 34, alt: "" },
  { type: "image", index: 35, alt: "" },
  { type: "image", index: 36, alt: "A goofy lil cat sits proudly unaware, a red circle around its head, connected by a line to a small pride flag, it's a gay cat." },
  { type: "image", index: 37, alt: "" },
  { type: "image", index: 38, alt: "A playful, silly lil cat sipping from a comically large puddle of bright green monster energy drink." },
  { type: "image", index: 39, alt: "A cute lil cat confidently holds a sign that says “GIVE ME $$$”." },
  { type: "image", index: 40, alt: "A cute lil cat confidently holds a sign that says “GAY.”" },
  { type: "image", index: 41, alt: "" },
  { type: "image", index: 42, alt: "" },
  { type: "image", index: 43, alt: "" },
  { type: "image", index: 44, alt: "" },
  { type: "image", index: 45, alt: "" },
  { type: "image", index: 46, alt: "" },
  { type: "image", index: 47, alt: "" },
  { type: "image", index: 48, alt: "Qiu Tong with wide, luminous eyes gazes intently at her phone screen, waiting for Sun Jing to respond." },
  { type: "image", index: 49, alt: "A cute lil puppy girl says “dont care. didn't ask plus i'm wagging my tail and going arf arf wraff bark :3”." },
  { type: "image", index: 50, alt: "An anime girl imitates the thinking emoji." },
  { type: "image", index: 51, alt: "Aya is so embarrassed that her hair is standing up and her face is completely red." },
  { type: "image", index: 52, alt: "Aya begging for forgiveness while Mitsuki tries to reassure her that it's fine." },
  { type: "image", index: 53, alt: "" },
  { type: "image", index: 54, alt: "" },
  { type: "image", index: 55, alt: "You're not cute with those puffy cheeks. You're 29!" },
  { type: "image", index: 56, alt: "Aya is looking at her phone, she's so full of joy that she's moved to tears." },
  { type: "image", index: 57, alt: "Woof! I mean yes!" },
  { type: "image", index: 58, alt: "" },
  { type: "image", index: 59, alt: "I'm a faggot…" },
  { type: "image", index: 60, alt: "An emoji with a huge frown looking at a computer screen." },
  { type: "image", index: 61, alt: "Izutsumi says “Gender”." },
  { type: "image", index: 62, alt: "A tiny little puppy says “Another silly day in my gorgeous tranny life”." },
  { type: "image", index: 63, alt: "" },
  { type: "image", index: 64, alt: "" },
  { type: "image", index: 65, alt: "Pure, unadulterated puppy-dog excitement radiates from this character seen from behind, complete with dog ears and an energetically wagging tail." },
  { type: "image", index: 66, alt: "Three adorable emoticon faces (:3, :3c, :3<) demonstrated by a cute character with flowing hair, each expressing a variation of sweet, cat-like coyness." },
  { type: "image", index: 67, alt: "" },
  { type: "image", index: 68, alt: "Pure, unadulterated puppy-dog excitement radiates from this character seen from behind, complete with dog ears and an energetically wagging tail." },
  { type: "image", index: 69, alt: "" },
  { type: "image", index: 70, alt: "" },
  { type: "image", index: 71, alt: "" },
  { type: "image", index: 72, alt: "" },
  { type: "image", index: 73, alt: "" },
  { type: "image", index: 74, alt: "Brodie the cat says “not a single thought behind your eyes” Elly the dog is confused but then squints and says “wait a minute”." },
  { type: "image", index: 75, alt: "" },
  { type: "image", index: 76, alt: "A sassy mf sits at a desk with a mouse and keyboard." },
  { type: "image", index: 77, alt: "A little puppy says “Welcome to my site”." },
  { type: "image", index: 78, alt: "" },
  { type: "image", index: 79, alt: "A proud yuri enthusiast beams, sporting her “YURI WATCHING HAT” and flashing her “registered YURI EXPERT” card, radiating pure, unadulterated love for the genre, behind her is a lesbian pride flag." },
  { type: "image", index: 80, alt: "A chaotic meme advises to “JUST SCAMPER OUT” if things suck, featuring Izutsumi the cat-person and a humorous list of escapable situations followed by “IF IT SUCKS... HIT DA BRICKS!!”, hilariously championing “real winners quit”." },
  { type: "image", index: 81, alt: "A character with a gentle, inviting smile extends a hand, offering a heartfelt invitation: “LET'S TAKE ESTROGEN TOGETHER”." },
  { type: "image", index: 82, alt: "" },
  { type: "image", index: 83, alt: "" },
  { type: "image", index: 84, alt: "A tiny little cat puts a huge middle finger up to the camera." },
  { type: "image", index: 85, alt: "WHAT is on that computer screen?!" },
  { type: "image", index: 86, alt: "" },
  { type: "image", index: 87, alt: "Falin is a lil puppy giggling." },
  { type: "image", index: 88, alt: "Marcile is a lil puppy giggling." },
  { type: "image", index: 89, alt: "" },
  { type: "image", index: 90, alt: "" },
  { type: "image", index: 91, alt: "" },
  { type: "video", index: 0, alt: "" },
  { type: "video", index: 1, alt: "" },
  { type: "video", index: 2, alt: "Ahsoka Tano and Darth Maul prepare to fight." },
  { type: "video", index: 3, alt: "" },
  { type: "video", index: 4, alt: "“Gets to you, doesn't it?” — Marva, Andor." },
  { type: "video", index: 5, alt: "“Heh.” — Anya smugly" },
  { type: "video", index: 6, alt: "" },
  { type: "video", index: 7, alt: "" },
  { type: "video", index: 8, alt: "" },
  { type: "video", index: 9, alt: "" },
  { type: "video", index: 10, alt: "the autism creature bouncing up and down." },
  { type: "video", index: 11, alt: "" },
  { type: "video", index: 12, alt: "" },
  { type: "video", index: 13, alt: "Aya, green yuri, surounded by sparkles and the text “is somebody gonna match my freak?”." },
  { type: "video", index: 14, alt: "" },
  { type: "video", index: 15, alt: "Bingo getting swallowed by the cinema seat she's sitting in." },
  { type: "video", index: 16, alt: "Bingo dancing under a hand dryer giggling." },
  { type: "video", index: 17, alt: "A cat making biscuits on a blue ikea shark, captioned by the text “hate crime”." },
  { type: "video", index: 18, alt: "A sparkly little blue ikea shark spinning around." },
  { type: "video", index: 19, alt: "BMO dancing." },
  { type: "video", index: 20, alt: "BMO farting." },
  { type: "video", index: 21, alt: "BMO doing a kickflip." },
  { type: "video", index: 22, alt: "A racoon girl chugs a drink, “Mmm estrogen!~”." },
  { type: "video", index: 23, alt: "A racoon girl laughing." },
  { type: "video", index: 24, alt: "A racoon girl tapping on her phone." },
  { type: "video", index: 25, alt: "Marceline lying over Princess bubblegum on the couch, they're reading a magazine together." },
  { type: "video", index: 26, alt: "Princess bubblegum kisses Marceline on the cheek." },
  { type: "video", index: 27, alt: "Princess bubblegum and Marceline sleeping, Bubblegum sleeps perfectly while Marceline is sprawled comfortably." },
  { type: "video", index: 28, alt: "C3PO stripping off his robe sexily." },
  { type: "video", index: 29, alt: "“Hey are you listening?” “Yeh” meanwhile in their thought bubble, Vi slams Caitlyn into the wall, kabedon style." },
  { type: "video", index: 30, alt: "“I just think they're neat” says Marg holding Caitlyn and Vi getting hot and heavy." },
  { type: "video", index: 31, alt: "" },
  { type: "video", index: 32, alt: "“watch yo tone mf” Dr Eggman slaps Chow into the stratosphere." },
  { type: "video", index: 33, alt: "" },
  { type: "video", index: 34, alt: "Golden retriever spinning in circles." },
  { type: "video", index: 35, alt: "Chilli dancing." },
  { type: "video", index: 36, alt: "" },
  { type: "video", index: 37, alt: "" },
  { type: "video", index: 38, alt: "Ed balancing a TV on their head." },
  { type: "video", index: 39, alt: "" },
  { type: "video", index: 40, alt: "Glep dancing." },
  { type: "video", index: 41, alt: "Danny Brown is confused “?????????”." },
  { type: "video", index: 42, alt: "" },
  { type: "video", index: 43, alt: "" },
  { type: "video", index: 44, alt: "" },
  { type: "video", index: 45, alt: "A tiny Harry Du Bois break dancing in front of Kim Kitsuragi." },
  { type: "video", index: 46, alt: "" },
  { type: "video", index: 47, alt: "" },
  { type: "video", index: 48, alt: "Doechii looking like a gorgeous badass." },
  { type: "video", index: 49, alt: "" },
  { type: "video", index: 50, alt: "A lil dog barking, the wizard then turns the dog into a piece of wood with a grain pattern that looks like the dogs face." },
  { type: "video", index: 51, alt: "Troy arrives back to the house in shambles, fire everywhere and everyone freaking out." },
  { type: "video", index: 52, alt: "Ed and some bits and pieces floating around the ship, Ein doggy paddles past." },
  { type: "video", index: 53, alt: "" },
  { type: "video", index: 54, alt: "" },
  { type: "video", index: 55, alt: "Dr Eggman says “I'm going to kill you. And then kill you again”." },
  { type: "video", index: 56, alt: "A silly lil anime girl goes “Eheh, bleehh”." },
  { type: "video", index: 57, alt: "" },
  { type: "video", index: 58, alt: "Enid sleeping messily, sprawled out in her bed." },
  { type: "video", index: 59, alt: "" },
  { type: "video", index: 60, alt: "" },
  { type: "video", index: 61, alt: "Falin dances happily as Laios shows her his new sword." },
  { type: "video", index: 62, alt: "lil Falin is munching." },
  { type: "video", index: 63, alt: "Falin looking adorable as ever smiles at the camera." },
  { type: "video", index: 64, alt: "Tiny Falin eats soup." },
  { type: "video", index: 65, alt: "" },
  { type: "video", index: 66, alt: "" },
  { type: "video", index: 67, alt: "Falin puts Marcile into a gay panic as she shares her mana with her." },
  { type: "video", index: 68, alt: "" },
  { type: "video", index: 69, alt: "" },
  { type: "video", index: 70, alt: "" },
  { type: "video", index: 71, alt: "" },
  { type: "video", index: 72, alt: "Femtanyl's lil cat persona dancing." },
  { type: "video", index: 73, alt: "Fink leaves." },
  { type: "video", index: 74, alt: "Fink bites." },
  { type: "video", index: 75, alt: "Purple guy dances." },
  { type: "video", index: 76, alt: "Frank Ocean sips his drink while surrounded by Odd Future." },
  { type: "video", index: 77, alt: "Fujiko removes her amazing disguise like a badass." },
  { type: "video", index: 78, alt: "Fujiko removes her disguise and starts her motorbike." },
  { type: "video", index: 79, alt: "" },
  { type: "video", index: 80, alt: "Gandalf dancing." },
  { type: "video", index: 81, alt: "A lil puppy dancing to music." },
  { type: "video", index: 82, alt: "Gimli covers his mouth in shock." },
  { type: "video", index: 83, alt: "A goblin typing on a computer with the caption “goblin hours”." },
  { type: "video", index: 84, alt: "A happy puppy girl dancing around and banging her head." },
  { type: "video", index: 85, alt: "A skeleton riding a motorcycle with flames in the background, captioned “Trans rights!”." },
  { type: "video", index: 86, alt: "I have hired MF DOOM to stare at you." },
  { type: "video", index: 87, alt: "A lil puppy girl gets her snout grabbed and her head shaken about, then she blushes." },
  { type: "video", index: 88, alt: "Jake and a bug dance together." },
  { type: "video", index: 89, alt: "Jake sips a cup of coffee." },
  { type: "video", index: 90, alt: "Jerma dancing, terribly." },
  { type: "video", index: 91, alt: "jpegmafia jumpscare." },
  { type: "video", index: 92, alt: "JPEGMafia with sparkly Miku." },
  { type: "video", index: 93, alt: "Peggy can't believe this shit." },
  { type: "video", index: 94, alt: "Kanna eats a crab." },
  { type: "video", index: 95, alt: "" },
  { type: "video", index: 96, alt: "Kanna dancing in the rain." },
  { type: "video", index: 97, alt: "" },
  { type: "video", index: 98, alt: "Kanna sip." },
  { type: "video", index: 99, alt: "" },
  { type: "video", index: 100, alt: "Karlach puppy eyes." },
  { type: "video", index: 101, alt: "" },
  { type: "video", index: 102, alt: "" },
  { type: "video", index: 103, alt: "" },
  { type: "video", index: 104, alt: "" },
  { type: "video", index: 105, alt: "Ursula sits on her roof drawing the birds next to her." },
  { type: "video", index: 106, alt: "Kim Kitsuragi dancing." },
  { type: "video", index: 107, alt: "" },
  { type: "video", index: 108, alt: "Kobayashi typing at a blistering pace." },
  { type: "video", index: 109, alt: "" },
  { type: "video", index: 110, alt: "" },
  { type: "video", index: 111, alt: "" },
  { type: "video", index: 112, alt: "“Remember, you can't trust men.” — Lady Eboshi." },
  { type: "video", index: 113, alt: "Lady Eboshi laughing a hearty laugh." },
  { type: "video", index: 114, alt: "" },
  { type: "video", index: 115, alt: "" },
  { type: "video", index: 116, alt: "" },
  { type: "video", index: 117, alt: "Little Simz dancing with headless suits." },
  { type: "video", index: 118, alt: "Live Jerma reaction." },
  { type: "video", index: 119, alt: "" },
  { type: "video", index: 120, alt: "" },
  { type: "video", index: 121, alt: "" },
  { type: "video", index: 122, alt: "" },
  { type: "video", index: 123, alt: "" },
  { type: "video", index: 124, alt: "" },
  { type: "video", index: 125, alt: "" },
  { type: "video", index: 126, alt: "" },
  { type: "video", index: 127, alt: "" },
  { type: "video", index: 128, alt: "" },
  { type: "video", index: 129, alt: "" },
  { type: "video", index: 130, alt: "Miku plushy swinging." },
  { type: "video", index: 131, alt: "Miku plushy in the washing machine." },
  { type: "video", index: 132, alt: "" },
  { type: "video", index: 133, alt: "" },
  { type: "video", index: 134, alt: "" },
  { type: "video", index: 135, alt: "Misato removes her sunglasses looking amazing." },
  { type: "video", index: 136, alt: "Misato does the worlds biggest yawn." },
  { type: "video", index: 137, alt: "Mitsuki's honest reaction 😐" },
  { type: "video", index: 138, alt: "" },
  { type: "video", index: 139, alt: "Shinji screams “MUSTAAAAAAAAAAARD”." },
  { type: "video", index: 140, alt: "" },
  { type: "video", index: 141, alt: "" },
  { type: "video", index: 142, alt: "Noel the dear girl with huge puppy dog eyes." },
  { type: "video", index: 143, alt: "" },
  { type: "video", index: 144, alt: "" },
  { type: "video", index: 145, alt: "" },
  { type: "video", index: 146, alt: "" },
  { type: "video", index: 147, alt: "" },
  { type: "video", index: 148, alt: "" },
  { type: "video", index: 149, alt: "" },
  { type: "video", index: 150, alt: "" },
  { type: "video", index: 151, alt: "PB tries estrogen." },
  { type: "video", index: 152, alt: "" },
  { type: "video", index: 153, alt: "" },
  { type: "video", index: 154, alt: "" },
  { type: "video", index: 155, alt: "A lil fluffy creature blinks one eye at a time." },
  { type: "video", index: 156, alt: "" },
  { type: "video", index: 157, alt: "A fluffy lil puppy tip tapping on a keyboard." },
  { type: "video", index: 158, alt: "" },
  { type: "video", index: 159, alt: "A lil fluffy puppy spinning around and around." },
  { type: "video", index: 160, alt: "A golden retriever sits on a swing, swinging back and forth." },
  { type: "video", index: 161, alt: "The Rei plushy taunts Shinji with the Gangnam style dance." },
  { type: "video", index: 162, alt: "Senator Chuchi." },
  { type: "video", index: 163, alt: "" },
  { type: "video", index: 164, alt: "" },
  { type: "video", index: 165, alt: "" },
  { type: "video", index: 166, alt: "We've had one yes, but what about second breakfast?" },
  { type: "video", index: 167, alt: "Shadow… It's me! The Devil!" },
  { type: "video", index: 168, alt: "Shadowheart being an autistic lil nerd and over explaining." },
  { type: "video", index: 169, alt: "" },
  { type: "video", index: 170, alt: "Smeagol's 3D model with a light spinning around it, the caption reads “POV: Microwave burrito”." },
  { type: "video", index: 171, alt: "" },
  { type: "video", index: 172, alt: "" },
  { type: "video", index: 173, alt: "" },
  { type: "video", index: 174, alt: "“Something just happened” Sonic fandub." },
  { type: "video", index: 175, alt: "Spamton dances." },
  { type: "video", index: 176, alt: "" },
  { type: "video", index: 177, alt: "Lego clone trooper goes to the toilet." },
  { type: "video", index: 178, alt: "" },
  { type: "video", index: 179, alt: "" },
  { type: "video", index: 180, alt: "Taiko Don gets petted." },
  { type: "video", index: 181, alt: "" },
  { type: "video", index: 182, alt: "Gollum asks Samwise “What's Taters... Precious?” Sam agrily replies “POH-TAY-TOHS?! BOIL EM', MASH EM' STICK EM', IN A STEW?”." },
  { type: "video", index: 183, alt: "" },
  { type: "video", index: 184, alt: "Tem's eye are spinning around all silly." },
  { type: "video", index: 185, alt: "You're at the Tem Shop and Tem is losing her mind." },
  { type: "video", index: 186, alt: "" },
  { type: "video", index: 187, alt: "" },
  { type: "video", index: 188, alt: "" },
  { type: "video", index: 189, alt: "" },
  { type: "video", index: 190, alt: "Toru yapping like an idiot." },
  { type: "video", index: 191, alt: "Toph points into the distance and says “There it is!”, everyone looks, they don't see anything. She then says “That's what it'll sound like when one of you spot it.”." },
  { type: "video", index: 192, alt: "" },
  { type: "video", index: 193, alt: "A cat brings a trans flag into the room. Kitty says trans rights!" },
  { type: "video", index: 194, alt: "A trans flag blows in the wind with the caption “guys help what country is this flag from and why do all the cute girls come from there????”." },
  { type: "video", index: 195, alt: "" },
  { type: "video", index: 196, alt: "" },
  { type: "video", index: 197, alt: "Tyler the Creator saying “A you putting another filter on me?”." },
  { type: "video", index: 198, alt: "Tyler the Creator posing like a cutie, he's kinda quirky." },
  { type: "video", index: 199, alt: "A puppy girl holds up a magnifine glass with the caption “Where the yuri at?”." },
  { type: "video", index: 200, alt: "A wizard holds the autism symbol as a train drives around him." },
  { type: "video", index: 201, alt: "" },
  { type: "video", index: 202, alt: "A dog runs towards Rin but hits the end of it's leash before it can jump on her, she giggles, but then a second dog with a longer leash ploughs into her stomach at mach one." },
  { type: "video", index: 203, alt: "" },
  { type: "video", index: 204, alt: "" },
  { type: "video", index: 205, alt: "" },
  { type: "video", index: 206, alt: "" },
  { type: "video", index: 207, alt: "" },
  { type: "video", index: 208, alt: "" },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createMediaElement(item, index) {
  switch (item.type) {
    case "image": {
      const img = document.createElement("img");
      img.src = `/assets/img/silly-shit/image${item.index}.jpg`;
      img.alt = item.alt;
      img.className = "grid-item";
      return img;
    }
    case "video": {
      const fragment = document.createDocumentFragment();
      const video = document.createElement("video");
      video.autoplay = true;
      video.controls = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.className = "grid-item";
      const source = document.createElement("source");
      source.src = `/assets/img/silly-shit/video${item.index}.mp4`;
      source.type = "video/mp4";
      video.appendChild(source);
      const alt = document.createElement("p");
      const altId = `video-alt-${index}`;
      alt.textContent = item.alt;
      alt.id = altId;
      alt.setAttribute("hidden", "");
      video.setAttribute("aria-labelledby", altId);
      fragment.appendChild(video);
      fragment.appendChild(alt);
      return fragment;
    }
  }
}

function populateMediaWall(first) {
  const wall = document.getElementById("media-wall");
  wall.innerHTML = "";

  // Not all the media have text descriptions so we want to at least
  // make sure everything on the first population of the media wall does
  const items = first ? mediaFiles.filter(item => item.alt && item.alt.trim() !== "") : mediaFiles;

  // Filter out recently shown items
  const availableItems = items.filter(item => !recentlyShown.has(item.index));
  
  // If we don't have enough items after filtering, reset the recently shown set
  if (availableItems.length < 9) {
    recentlyShown.clear();
  }

  // Shuffle and take first 9 items
  const selectedMedia = shuffleArray([...availableItems]).slice(0, 9);

  // Update recently shown set
  selectedMedia.forEach((item) => {
    recentlyShown.add(item.index);
    // Keep the set size manageable
    if (recentlyShown.size > RECENT_HISTORY_SIZE) {
      const firstItem = recentlyShown.values().next().value;
      recentlyShown.delete(firstItem);
    }
  });

  selectedMedia.forEach((item, index) => {
    const element = createMediaElement(item, index);
    wall.appendChild(element);
  });
}

// Add this new function for the button
function setupRandomiseButton() {
  const button = document.getElementById("randomiseButton");
  button.addEventListener("click", () => populateMediaWall(false));
}

// Add this new function for the pause button
function setupPauseButton() {
  const button = document.getElementById("pauseAllButton");
  const playIcon = button.querySelector(".icon-play");
  const pauseIcon = button.querySelector(".icon-pause");
  const buttonText = button.querySelector("span");
  let isPaused = false;

  playIcon.setAttribute("hidden", "");
  pauseIcon.removeAttribute("hidden");

  button.addEventListener("click", () => {
    const videos = document.querySelectorAll("#media-wall video");
    isPaused = !isPaused;

    videos.forEach((video) => {
      if (isPaused) {
        video.pause();
        pauseIcon.setAttribute("hidden", "");
        playIcon.removeAttribute("hidden");
        buttonText.textContent = "Play all videos";
      } else {
        video.play();
        playIcon.setAttribute("hidden", "");
        pauseIcon.removeAttribute("hidden");
        buttonText.textContent = "Pause all videos";
      }
    });
  });
}

// Update the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  populateMediaWall(true);
  setupRandomiseButton();
  setupPauseButton();
});
</script>

<style>
  #media-wall {
    columns: 6 200px;
    column-gap: var(--inline-size-3);
  }
  #media-wall > :is(img, video) {
    --flow-space: var(--block-size-2);

    image-rendering: pixelated;
    width: 100%;
  }
</style>

So I finished this post like 6 months ago, but I've been putting off posting it because I wanted to make sure all _300_ of these images had alt text… 

but I've had to give up bc it's taking wayyy too long 😔

**I managed to do 150(!!) of them 🤯**

I feel like that's a valient effort, right? 🥲

If you feel so inclined, please [help me finish writing all the alt text](https://github.com/ellyloel/ellyloel.com/edit/main/src/input/content/garden/How%20personal%20is%20my%20personal%20website?.md) 🙏🏻
