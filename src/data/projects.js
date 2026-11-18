// Generated from the case studies in Projects/Case Studies (linear format). Edit the studies, then run scripts/case-studies-to-projects.py.
// An image with `placeholder` and no `src` shows a neutral box until the real screen is captured.
export const projects = {
  "placeam": {
    "title": "Placeam",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "We set out to solve the distance between an outfit in someone's head and a garment they can wear.",
          "Getting it made usually means back-and-forth with a tailor. Choosing a fabric from its name is guessing. And one idea goes to one maker, one piece at a time. This comes from my own experience of getting clothes made, and from the needs the founders brought to the team.",
          "Our goal was to help people shop, design with AI and have a piece made, and sell, from one app on their phone. For the business, the Design Studio is meant to get people customising their clothes and ordering them, which sends more orders to makers and gives people a reason to come back.",
          "What the work produced is an installable web app whose home screen answers in three steps: \"Describe it. Design it. Have it made.\" In the current build, Placy, the maker service and warehouse stock run on mock data. It has not been tested with users yet. That is the next step."
        ],
        "image": {
          "alt": "The Placeam home screen",
          "placeholder": "The Placeam home screen"
        }
      },
      {
        "heading": "The Opportunity",
        "body": [
          "Four people come to Placeam.",
          "The first is the creator, whose job reads: \"Turn my idea into clothes I can actually wear, in my size, without back-and-forth with a tailor.\"",
          "The second is the group or family buyer, ordering aso-ebi, father-and-son sets or a bridal train.",
          "The third is the pre-owned buyer, who wants real luxury for less and proof that it is genuine.",
          "The fourth is the seller.",
          "People worry most about three things: will it fit, is my money safe, and who is responsible for my order."
        ]
      },
      {
        "heading": "The Decision",
        "body": [
          "Placeam is a fashion app made for the phone.",
          "Five tabs hold its jobs. Home is for discovery. Pre-Owned shows members' luxury pieces, authenticated by Placeam's own team. The centre tab opens the Design Studio, where an assistant called Placy turns a description into a garment. The Closet is the shop. Profile keeps orders, measurements and listings."
        ],
        "image": {
          "alt": "The Closet with the tab bar",
          "placeholder": "The Closet with the tab bar"
        }
      },
      {
        "body": [
          "Four bets sit under it.",
          "The first is that an edit beats a new generation. Once a look exists, a change runs as an edit of the same garment, so the look stays consistent.",
          "The second is honesty about what AI makes. The image is a design reference. The maker confirms fabric, measurements, price and date before anything is cut, and Placeam holds the payment until the buyer confirms delivery.",
          "The third is that Nigerian traditional wear comes first. The fabric library opens on its traditional tab for traditional designs, and price tiers follow Lagos market prices per yard.",
          "The fourth is a smaller product. The MVP hides the Fashion House and gives its tab to Pre-Owned.",
          "I designed Placeam alongside a co-designer, working with a product manager and the founders. The work began in August."
        ]
      },
      {
        "heading": "Where The Detail Lives",
        "body": [
          "Four deeper studies pick up from here. One follows a person with taste but no garment-making knowledge through the AI Studio. One looks at Cut and shape, which changes a silhouette, neckline, sleeve or hem. One covers the pen, for pointing at the part to change. And one covers Order several, which sends several variations to one maker as one brief."
        ]
      }
    ]
  },
  "placeam-ai-studio": {
    "title": "The AI Studio For People Who Are Not Tailors",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "We set out to solve a vocabulary problem. Asking for a change to a garment needs two things: you have to name the part, and you have to name what it should become. The idea came from my own experience of getting clothes made.",
          "Our goal was to help someone with taste but no garment-making knowledge ask the Placeam Design Studio for one specific change, and then have it made. For the business, the Design Studio is meant to get people customising their clothes and ordering them, which sends more orders to makers and gives people a reason to come back.",
          "What the work produced is a working flow in the current build, from a first sentence, to one specific change, to a paid order. It has not been tested with users yet. That is the next step.",
          "This is the story of how it got there."
        ],
        "image": {
          "alt": "The studio before anything is made",
          "placeholder": "The studio before anything is made"
        }
      },
      {
        "heading": "The Opportunity",
        "body": [
          "A tailor can say \"bishop sleeve, jewel neck, high-low hem\" and be understood.",
          "Most people who want clothes made cannot. But they can point.",
          "Placeam is a fashion app where you describe an outfit, an assistant called Placy designs it, and a maker sews it in your size.",
          "Technical users, such as tailors, already have a base knowledge of garment making. The person this flow is for does not. Their job is written down: \"Turn my idea into clothes I can actually wear, in my size, without back-and-forth with a tailor.\"",
          "Without the vocabulary, a person is stuck on both the part and the change.",
          "I designed the two ways of closing that gap, Cut and shape and the pen, myself."
        ]
      },
      {
        "heading": "Understanding The Constraint",
        "body": [
          "Two limits shaped the flow.",
          "The first is what a change costs. The product notes give the reason every change runs as an edit of the look on screen: an edit keeps the look consistent and is fast, where generating from scratch is slow and drifts away from the look.",
          "The second is what the picture can promise. The image is a design reference. The maker confirms fabric, measurements, price and date.",
          "In this build, Placy is a mock generator that returns prepared looks, and tappable seam regions exist only for the dashiki. The flow is real. The image-making is not yet.",
          "Changing one part without redrawing the rest depends on the AI model, which the ML engineer is building."
        ]
      },
      {
        "heading": "The Job To Be Done",
        "body": [
          "With that set, the job was to say which part, and what it should become, without knowing the word for either."
        ]
      },
      {
        "heading": "The Decision",
        "body": [
          "What shipped closes the gap in two ways, after a start that asks for nothing technical.",
          "The prompt box asks for \"the outfit, the occasion, the fabric, the feeling, whatever's in your head right now.\" Two suggestion chips show what a request can look like, and a reference image can stand in for words.",
          "Once a look is on the canvas, a toolbar appears: Text, Cut and shape, Colour, Fabric and Insert.",
          "The first way is pointing. With Cut and shape or Colour open, a pen appears on the side rail. The person taps a seam region or draws a loop around any area, and the pick is outlined in yellow. A \"Change to\" button appears beside it, and a small box asks them to describe that part. On the batik dashiki, tapping the pocket gives \"Describe the pocket…\".",
          "Whatever they type is sent as a request about that part only. They never had to name it."
        ],
        "image": {
          "alt": "A part picked with the pen",
          "placeholder": "A part picked with the pen"
        }
      },
      {
        "body": [
          "The second is choosing from pictures. Cut and shape has four sheets: Outline, Neckline, Sleeve and Hemline. Each shows three drawn options, and the canvas zooms to that part of the garment. Picking the V-Neck drawing and confirming writes the request for them: change the neckline to V-Neck."
        ],
        "image": {
          "alt": "Choosing a neckline from drawings",
          "placeholder": "Choosing a neckline from drawings"
        }
      },
      {
        "body": [
          "Each edit is listed in History, labelled with the request that made it, so the person can step back.",
          "Done offers Share, Save or Order. Order opens Get it made, in four steps: measurements, a brief, a maker, then review and pay. The brief has a notes field for the maker, and its example is written the way a person talks: \"Modest neckline, pockets in the skirt, wedding on 14 December\".",
          "Three reasons sit behind it.",
          "The first is that it needs no tailoring words. The person points at the part, or picks its new shape from a drawing.",
          "The second is that it is guided. The person fixes the garment by hand instead of typing a new prompt every time.",
          "The third is that only the chosen part changes, so the rest of the look stays as it is."
        ]
      },
      {
        "heading": "The Trade-off",
        "body": [
          "Before paying, the buyer ticks one box: \"I understand the image is a design reference. My maker will confirm fabric, construction and fit with me before cutting.\"",
          "Placeam holds the payment until delivery is confirmed.",
          "The technical knowledge comes back in at this point, with the maker, who has it.",
          "The person gives up an exact, final picture, because the image is a design reference. In return, they never need the tailoring vocabulary, and the maker, who has it, confirms the details before anything is cut."
        ]
      },
      {
        "heading": "Learnings",
        "body": [
          "A copy review renamed \"Branch chat\" to \"Try a new direction\", because \"there is no chat; this is developer language\". \"Style to\" became \"Change to\". \"PROMPT\" on a saved design became \"Your description\".",
          "The studio records named events for a design requested, generated and failed, and for each tool opened. Usability testers arrive through a tagged link.",
          "I designed Placeam alongside a co-designer, working with a product manager and the founders. The work began in August."
        ]
      }
    ]
  },
  "placeam-cut-and-shape": {
    "title": "Cut and Shape",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "We set out to solve one problem in the Placeam Design Studio: fixing the shape of a garment meant typing a new prompt, and a new prompt makes a new garment.",
          "A studio that runs on prompts would have people typing a new prompt every time they wanted to fix a shape. I wanted a creative, guided way for them to fix it by hand instead.",
          "Our goal was to help someone change one part of a garment and keep the rest. For the business, the Design Studio is meant to get people customising their clothes and ordering them, which sends more orders to makers and gives people a reason to come back.",
          "What the work produced is a working tool in the current build: four parts, drawn options for each, and every cut kept as a version. It has not been tested with users yet. That is the next step."
        ],
        "image": {
          "alt": "The Design Studio with Cut and shape open on the batik dashiki, measurements drawn over the garment and the four-part bar above the tool row",
          "placeholder": "The Design Studio with Cut and shape open on the batik dashiki"
        }
      },
      {
        "heading": "The Opportunity",
        "body": [
          "Placeam is a fashion app where people design clothes with Placy, the app's AI, and then have them made. Once Placy has produced a look, the Design Studio offers a row of tools to work on it: Text, Cut and shape, Colour, Fabric and Insert.",
          "A garment is mostly its shape.",
          "Two tops in the same fabric and the same colour can be different clothes. One has a V-neck and a straight hem. The other has puff sleeves and a hem that drops at the back.",
          "If the neckline is wrong, the obvious move is to type a new prompt. But the part that was right can change along with the part that was wrong. The product notes name the risk: generating from scratch is slow and drifts away from the look.",
          "The person the Studio is built for wants to \"turn my idea into clothes I can actually wear, in my size, without back-and-forth with a tailor.\" Neckline, sleeve and hem are exactly what that back-and-forth is usually about.",
          "I designed Cut and shape myself. The product manager and the founders approved it."
        ]
      },
      {
        "heading": "Defining Success",
        "body": [
          "The founders want the Design Studio to do three things for Placeam. The first is to get people customising their clothes and ordering them. The second is more orders sent to makers. The third is a reason for people to come back more often.",
          "Cut and shape is one of the ways a person customises a garment, and every cut ends in a look that can go straight to a maker."
        ]
      },
      {
        "heading": "Understanding The Constraint",
        "body": [
          "A cut is a request to Placy, not a direct change to the picture.",
          "Text and Insert add layers on top of the garment, with ordinary undo and redo. Cut, Colour and Fabric go to Placy as an edit and come back as a new version of the same garment, listed in History under the request that made it. Going back on a cut means choosing the earlier version.",
          "Changing one part without redrawing the rest depends on the AI model, which the ML engineer is building. Each cut is sent as a request about one part only."
        ],
        "image": {
          "alt": "The History panel listing versions of one design, with rows named by their edit requests such as a neckline change",
          "placeholder": "The History panel listing versions of one design"
        }
      },
      {
        "heading": "The Job To Be Done",
        "body": [
          "With that set, the job was plain: change one part of a garment's shape, keep everything else, and be able to go back."
        ]
      },
      {
        "heading": "The Idea",
        "body": [
          "Splitting the garment into parts was the first idea I had for Cut and shape, and the only one I worked on.",
          "It came from my own experience of getting clothes made. A garment is a system made of components. The outline, the neckline, the sleeve and the hem are the fundamental parts of garment making, and they are the parts a person can be creative with.",
          "My focus was on the styles each part can take: which neckline, which sleeve, which hem."
        ]
      },
      {
        "heading": "The Decision",
        "body": [
          "Tapping the scissors replaces the toolbar with a labelled bar of four parts: Outline, Neckline, Sleeve and Hemline.",
          "Tapping a part does two things at once. The canvas zooms to that part of the garment, and a sheet rises with the choices for it, each shown as a line drawing. Neckline offers Jewel, V-Neck and U-Neck.",
          "Confirming a choice sends Placy a plain request, such as \"Change the neckline to V-Neck (women's cut)\".",
          "The measurements stay on the garment while the tool is open, so people shape their style around their real body measurements."
        ],
        "image": {
          "alt": "The Neckline sheet open, the canvas zoomed to the collar and three line-drawn options with one selected",
          "placeholder": "The Neckline sheet open"
        }
      },
      {
        "body": [
          "For anything beyond the named parts, a pen on the side rail lets someone tap a seam area or draw a loop around any area, then describe what should happen there. While the pen is on, the canvas shows the pattern view, the garment's pieces drawn as an outline. That view only helps when someone is about to draw, so I tied it to the pen instead of giving it a button of its own. The pen has its own case study.",
          "Three reasons sit behind the design.",
          "The first is that it follows how a garment is made. The parts on the bar are the fundamental parts of garment making.",
          "The second is that it is guided. The person fixes the shape by hand, choosing from drawings, instead of typing a new prompt every time.",
          "The third is that only the chosen part changes. Each cut runs as an edit of the look that already exists, so the rest stays consistent."
        ]
      },
      {
        "heading": "The Trade-off",
        "body": [
          "One thing holds in art and design: everything has a root.",
          "The sheets hold the roots. A person starts from a base neckline, and the pen is for going past it, when they want to change the look of that neckline outright.",
          "So to go past a base shape, the person takes an extra step, marking the area and describing the change. In return, they never need to know the tailoring word."
        ]
      },
      {
        "heading": "Learnings",
        "body": [
          "The hardest part was deciding how to divide a garment into pieces. My answer was to follow its seam lines, the joints where a garment is sewn together. That is where the pattern view draws its dashed lines.",
          "Each part shows three options in this build, and Placy is still a stand-in, so a cut records the request but the picture stays the same. The sheets are meant to be filled with more: all the fundamental styles of each part in garment making.",
          "Looking back, the four parts change the style of each part but not its size. A slider for sleeve length, neckline depth and hem length, set against the person's own measurements, is what I would add next."
        ]
      }
    ]
  },
  "placeam-pen": {
    "title": "The Pen",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "We set out to solve a gap in Placeam's Cut and shape tool: a sheet of options only works when the app already knows the part. Named parts only go so far. Someone who wants to change the patch under a pocket has no button for it, and typing a new prompt would redraw the whole garment.",
          "Our goal was to help someone point at any part of a garment and say what should change there, without having to name it. For the business, the Design Studio is meant to get people customising their clothes and ordering them, which sends more orders to makers and gives people a reason to come back.",
          "What the work produced is a pen in the current build that takes a tap or a freehand loop and turns it into a request about that area only. It has not been tested with users yet. That is the next step.",
          "This is the story of how it got there."
        ],
        "image": {
          "alt": "The Design Studio with the pen switched on in Cut and shape, the dashiki shown as a white outline with dashed seam lines and a yellow loop being drawn",
          "placeholder": "The Design Studio with the pen switched on in Cut and shape"
        }
      },
      {
        "heading": "The Opportunity",
        "body": [
          "Some parts of a garment have names.",
          "Neckline. Sleeve. Hem.",
          "Others do not. The patch under the pocket. The strip where two prints meet. The corner of a panel that sits a little too wide.",
          "In Placeam's Design Studio, the Cut and shape tool changes a garment through four named parts, each with its own sheet of options. Every change goes to Placy, the app's AI, as an edit and comes back as a new version.",
          "The pen is the part of that tool for everything the four names leave out.",
          "I designed the pen myself."
        ]
      },
      {
        "heading": "Understanding The Constraint",
        "body": [
          "The canvas already used one finger. Dragging moves the cloth, pinching zooms it, and a double tap fits it back.",
          "A pen that also draws with one finger would fight that.",
          "The loop also had to stay on the same cloth. Each position is converted from screen space into the garment's own artboard, a fixed grid 268 units wide and 370 tall, so the loop stays attached when the canvas is zoomed or moved afterwards.",
          "And Placy is a stand-in in this build, so a marked area is carried in the request by name, not yet by its shape.",
          "Changing only the marked area, and leaving the rest of the garment as it is, depends on the AI model, which the ML engineer is building."
        ]
      },
      {
        "heading": "The Job To Be Done",
        "body": [
          "For a part with no name, the person has to say where, and the garment is already on screen under their finger.",
          "So the job was to give the place first and the words second."
        ]
      },
      {
        "heading": "The Ideas",
        "body": [
          "The commit history shows two versions.",
          "The first could not draw. It was a brush button that appeared only in Cut and shape, labelled \"Pick a part to restyle\", and it switched on three tappable seam areas of the dashiki. The pattern view was a separate button beside it.",
          "The second, the same day, moved the pen onto the rail using the icons from the Figma sidebar, and added the freehand loop, the yellow pick, and Undo and Redo. The pattern view stopped being its own button and became what the canvas shows while drawing.",
          "I made the pen a freehand tool on purpose. A freehand tool should not come with limits on where it can go, so the loop can go around any area, not only the parts the app already knows."
        ]
      },
      {
        "heading": "The Decision",
        "body": [
          "What shipped is a freehand loop.",
          "The pen is a button on the side rail of the canvas. In Cut and shape, switching it on changes the canvas. The photo of the garment gives way to its pattern: a solid white silhouette with dashed seam lines.",
          "As one finger moves, a yellow line follows it. Letting go closes the path. The app does not ask the person to return to the starting point: it joins the last point to the first with a straight line. There is no smoothing. The loop is the points the hand made.",
          "While the pen is on, moving the canvas takes two fingers and drawing takes one. Pinch and double tap keep working, so someone can zoom into a collar and then draw on it.",
          "Then the pen is switched off. The garment comes back with the loop still on it in yellow, and a small Change to button sits at the loop's top right corner."
        ],
        "image": {
          "alt": "The garment back on the canvas with the finished yellow loop and the Change to button at its top right, Undo and Redo above the bar",
          "placeholder": "The garment back on the canvas with the finished yellow loop and the Change to button..."
        }
      },
      {
        "body": [
          "Pressing Change to opens a field that reads \"Describe the marked area\". Whatever is typed there is sent to Placy as \"Restyle the marked area:\" followed by the note. The loop clears, and the result arrives as a new version.",
          "On the batik dashiki there is a quicker mode. Three seam areas are mapped by hand, the pocket, the collar and the centre panel, and a tap on one selects it.",
          "In Colour, the same pen narrows a recolour to the tapped or marked part."
        ],
        "image": {
          "alt": "The describe field open above the Cut and shape bar with a typed note and the Send button, the yellow loop still visible on the garment",
          "placeholder": "The describe field open above the Cut and shape bar with a typed note and the Send button"
        }
      },
      {
        "body": [
          "Three reasons sit behind it.",
          "The first is freedom. A freehand tool can go around any area.",
          "The second is that it needs no tailoring words. The person points first and describes second.",
          "The third is that only the marked area changes, so the rest of the garment stays as it is."
        ]
      },
      {
        "heading": "The Trade-off",
        "body": [
          "The four sheets are closed questions. Three options, one tap, a fixed request.",
          "The pen is an open one. The person chooses the place and writes the instruction.",
          "Only one area is held at a time. A new loop replaces the old one, and Undo and Redo are one step deep.",
          "To change a part with no name, the person takes an extra step, marking the area and describing the change in their own words. In return, they can change anything on the garment, not only the parts on the bar."
        ]
      },
      {
        "heading": "Learnings",
        "body": [
          "Only the dashiki and the polo have a traced pattern. On other looks the photo still steps aside while the pen is on in Cut and shape, and there is nothing drawn in its place.",
          "A later copy pass changed Style to into Change to."
        ]
      }
    ]
  },
  "placeam-order-several": {
    "title": "Order Several",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "We set out to solve a gap in the Placeam Design Studio: it worked when one person wanted one outfit, and a lot of Nigerian dressing is not like that.",
          "The product notes are blunt about it. There was no way to make variations of one look, and it was one submission per piece. The founders brought the need to me: group and family orders, where one look is made for several people.",
          "Our goal was to help the group or family buyer have several matching pieces made at once, each in the right size. For the business, the Design Studio is meant to get people customising their clothes and ordering them, which sends more orders to makers and gives people a reason to come back.",
          "What the work produced is Order several in the current build: up to 10 variations of one look, sent to one maker as one brief. It has not been tested with users yet. That is the next step.",
          "This is the story of how it got there."
        ]
      },
      {
        "heading": "The Opportunity",
        "body": [
          "Placeam is a fashion app with a Design Studio. A person describes a garment, the studio draws it, and a maker can then be asked to sew it.",
          "Aso-ebi, father-and-son sets and bridal trains all start from one look and end as several pieces, each for a different body.",
          "The studio had no answer for the second half of that sentence.",
          "Two things went wrong from there. Generating from scratch for every variation was slow, and each new attempt drifted away from the look. And sending pieces one by one multiplied the effort and lost the idea that the pieces belong together.",
          "The notes call the group buyer the quiet winner of this work, and say to design for them.",
          "I designed Order several myself."
        ]
      },
      {
        "heading": "Understanding The Constraint",
        "body": [
          "Every variation costs something to generate, and every piece costs a maker time to review.",
          "The limit of 10 was a deliberate answer. It keeps generation cost and the maker's review time bounded, and the notes judge that 10 covers most aso-ebi or family sets.",
          "Price was a second limit. In this build the estimate is a placeholder until makers quote: a fixed making cost, plus three yards of the chosen fabric, plus any sourcing charge."
        ]
      },
      {
        "heading": "The Job To Be Done",
        "body": [
          "With that set, the job was to take one look, turn it into several pieces, size each one for a different person, and send them as one order."
        ]
      },
      {
        "heading": "The Idea",
        "body": [
          "I kept the whole thing inside the Design Studio, the same place the look was made.",
          "People design all they want there before anything reaches an order. It is easier, and it avoids adding a separate screen with more steps between designing and ordering."
        ]
      },
      {
        "heading": "The Decision",
        "body": [
          "In the studio, the header menu has a Variations entry. It opens a History panel listing Variant 1, Variant 2 and so on. Make variations copies the look on screen as a new variant, so every variant starts from the same garment and not from a blank prompt.",
          "Choosing Order several turns the history into a checklist with a running count: Selected · 3 of 5. The button at the bottom reads Order · 3 variations."
        ],
        "image": {
          "alt": "The History panel as a checklist with three variants ticked",
          "placeholder": "The History panel as a checklist with three variants ticked"
        }
      },
      {
        "body": [
          "Order opens a single screen called Review and send, with one row per piece.",
          "A row carries two fields. Size opens a sheet with Standard size or My measurements, which lists saved profiles and an Add someone option, because a group order sizes other people. Fabric opens the material library, where a colour that has to be sourced adds days and sometimes a cost.",
          "The totals box adds the pieces up and gives one Ready by date. That date is set by the slowest piece, so a sourced fabric cannot hide a delay."
        ],
        "image": {
          "alt": "Review and send with three pieces, one sized, one with a sourced fabric",
          "placeholder": "Review and send with three pieces"
        }
      },
      {
        "body": [
          "The brief lands in the bag as one grouped line, Placy batch · 3 pieces. It stays editable while it says Awaiting maker. When the maker accepts, it moves to In review and locks, and changes go through the maker chat."
        ],
        "image": {
          "alt": "The bag with the grouped batch line opened to its pieces",
          "placeholder": "The bag with the grouped batch line opened to its pieces"
        }
      },
      {
        "body": [
          "Three reasons sit behind it.",
          "The first is fewer steps. Designing and choosing what to order happen in one place, with no extra screen in between.",
          "The second is that it is easier. People use the studio tools they already know to make each variant.",
          "The third is that every variant starts from the same garment, not from a blank prompt, so the set stays consistent."
        ]
      },
      {
        "heading": "The Trade-off",
        "body": [
          "Every variant inherits the measurements of the piece it came from, unless the person changes them. If no measurements were given at all, the maker confirms the size.",
          "When a variant is made, a quiet note appears at the top of the studio saying which measurements it uses, with a plain Change measurement link beside it. It does not interrupt the design, and it can be dismissed.",
          "So the person does not have to size every piece one by one before sending. In return, a matching set goes to a maker in a few taps, and any piece for a different body can still be resized before it is sent."
        ]
      },
      {
        "heading": "Learnings",
        "body": [
          "The name changed last. The entry was called Bulk Shipping until a copy review renamed it Order several, with the note that it is a batch order, not shipping.",
          "Some of this is still a stand-in. The maker's acceptance is simulated on a timer, stock is a preview until the warehouse is connected, and prices are estimates."
        ]
      }
    ]
  },
  "fleetkit": {
    "title": "Fleetkit",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "We set out to solve a trust problem in Nigeria's thrift trade, after looking at buyer and vendor experiences together and finding four recurring patterns. I found them through desk research, gathering and comparing what Nigerian thrift buyers and vendors say about the trade online.",
          "Our goal was to give buyers and vendors one place for a trade that already existed, with the parts that were missing: a payment that could be trusted, a delivery that could be tracked, and an order both sides could see. For the client, that meant a thrift marketplace that feels as social as the platforms the trade already runs on.",
          "What the work produced is a full set of designs for phone and desktop: sign-up, a social home feed, product pages, checkout with a held payment, order tracking, refunds and disputes, and a seller dashboard. It has not been tested with users yet. That is the next step.",
          "This is the story of how it got there."
        ],
        "image": {
          "src": "/images/project/image-1.webp",
          "alt": "Fleetkit wordmark on violet",
          "bg": "#d9d9d9"
        }
      },
      {
        "heading": "The Opportunity",
        "body": [
          "Okrika has become one of the most important fashion categories for budget-conscious and style-conscious young Nigerians.",
          "For many shoppers, thrift fashion offers access to unique pieces at prices that traditional retail stores cannot match. Yet despite the size of the market, very little of the buying journey happens inside a structured commerce experience.",
          "A typical purchase starts with a video.",
          "A buyer sees an item on Instagram or TikTok, comments \"mine,\" sends a message, negotiates delivery, transfers money, and waits.",
          "There is no shared order history.",
          "Most transactions depend entirely on trust between strangers. Buyers send money to vendors they have never met. Vendors reserve inventory for customers who may never pay. Once a package leaves the seller's hands, neither side has much protection if something goes wrong.",
          "The result is a market that grows through social media but struggles to scale beyond it."
        ],
        "image": {
          "src": "/images/project/image-2.webp",
          "alt": "Three Fleetkit mobile screens",
          "tight": true
        }
      },
      {
        "body": [
          "When we looked at buyer and vendor experiences together, four recurring patterns emerged.",
          "The first was trust. Buyers worried about paying for products that never arrived. Vendors worried about delivery costs and failed orders.",
          "The second was product accuracy. Because every thrift item is unique, photos and tag sizes often fail to communicate the true condition or fit of a garment.",
          "The third was inventory coordination. Popular items were frequently claimed by multiple people, creating confusion and abandoned sales.",
          "The final issue existed further upstream in the supply chain: bale quality and wholesaler reliability. While important, this problem sat outside the scope of Fleetkit's first version.",
          "The focus remained on the transaction itself, the moment where buyers and vendors interact directly."
        ]
      },
      {
        "heading": "Defining Success",
        "body": [
          "The brief did not ask for a new way to shop.",
          "It asked for one place for a trade that already existed. The same vendors and the same pieces.",
          "It had two people in mind. One was a student in Lagos who follows Instagram thrift stores for Y2K tops and vintage jeans, and who has already paid for an item that looked different when it arrived. The other was a seller who sources sneakers and graphic tees from local markets and runs his orders through WhatsApp groups and direct messages.",
          "I designed Fleetkit alone for a client, starting in January.",
          "The client wanted a thrift marketplace where buyers and vendors shop and sell, and one that feels social, the way social media works."
        ]
      },
      {
        "heading": "Understanding The Constraint",
        "body": [
          "Three constraints shaped the plan.",
          "The product had to earn trust before it had a single review. Many of its users browse on mobile data, so pages had to stay light. And many of them do not own a credit card, so debit cards, bank transfers and mobile money all had to work at checkout.",
          "Everything was planned around how they already buy and sell: prices in Naira, local payment methods, local couriers, and a phone as the only screen."
        ]
      },
      {
        "heading": "The Job To Be Done",
        "body": [
          "With that set, there were three jobs: pay a stranger safely, see the real garment, and know the item is yours."
        ],
        "image": {
          "alt": "The Fleetkit mobile web home screen",
          "placeholder": "The Fleetkit mobile web home screen"
        }
      },
      {
        "heading": "The Decision",
        "body": [
          "The first decision was to take the money out of the stranger's hands.",
          "A buyer pays inside the product instead of sending a transfer. The payment is held, and it is released to the seller only after the buyer confirms they got what they ordered. If the item never arrives, or is not as described, the buyer is refunded. The vendor gets the same certainty from the other side: a local courier is booked for pickup, a tracking number is recorded, and the funds are released on delivery.",
          "If something goes wrong, the buyer can ask for a refund, or open a case in a Resolution Center, where a mediator reviews the evidence both sides upload.",
          "A new marketplace has no reviews, so trust could not wait for ratings. Sellers are verified with a government ID before they list, and the verified status is shown on their profile."
        ],
        "image": {
          "alt": "The Secure Escrow screen, showing the held balance and the days until release",
          "placeholder": "The Secure Escrow screen"
        }
      },
      {
        "body": [
          "The second was to show the real garment. The listing was planned to ask for more than one flattering photo: front, back, a close-up of any flaws, and the item being worn. Every item carries a condition label, such as As New or Gently Used, and sellers are guided to write measurements, fabric and flaws into the description.",
          "The third was one item, one buyer. A comment is not an order. In the plan, a thrift piece is bought, not claimed. The seller is told the item has sold and is asked to ship within three days. When two buyers want the same piece, the first to pay gets it, and the other sees it marked Sold out.",
          "The fourth was the client's social goal. The home screen works like a feed, with vendor stories, a Shoppers Near You row, and Vibe Match, where a buyer uploads a screenshot of an outfit to find similar items. A buyer can also try a piece on an avatar shaped to their own body, in a feature called Flickfit AR.",
          "Three reasons sit behind these choices.",
          "The first is trust. The money is held until the buyer confirms the item arrived, so neither side has to trust a stranger.",
          "The second is familiarity. The feed, the vendor stories, Naira prices and local payments keep the trade close to how people already buy on social media.",
          "The third is clarity. One item makes one order, so nobody argues over who claimed it first."
        ]
      },
      {
        "heading": "The Trade-off",
        "body": [
          "Buyers give up the speed of a quick bank transfer, and sellers wait until delivery to be paid. A comment no longer reserves a piece either: the first to pay gets it. In return, both sides get a protection that a direct message cannot give."
        ]
      },
      {
        "heading": "Learnings",
        "body": [
          "Bale quality and wholesaler reliability stayed out, as decided."
        ],
        "image": {
          "alt": "A hand holding a phone that shows \"The Closet Edit\" story screen, on a lime background",
          "placeholder": "A hand holding a phone that shows \"The Closet Edit\" story screen"
        }
      }
    ]
  },
  "acemyx": {
    "title": "Acemyx",
    "hero": "/images/project/hero.svg",
    "sections": [
      {
        "body": [
          "AcemyX set out to solve a problem its venture profile states plainly: students from disadvantaged backgrounds have limited access to quality exam preparation.",
          "Its goal is to help university aspirants in Nigeria prepare for JAMB, WAEC and Post-UTME, at a price a student can pay.",
          "My work on AcemyX sits in two areas, identity and digital. I designed the AcemyX logo and website. The student dashboard, with the mock exam screens inside it, is in planning.",
          "The website is live. Measuring it, by following students from their first visit to a paid plan, is one of the next items on our product log."
        ],
        "image": {
          "alt": "AcemyX wordmark with its yellow burst on an orange field",
          "placeholder": "AcemyX wordmark with its yellow burst on an orange field"
        }
      },
      {
        "heading": "The Opportunity",
        "body": [
          "In Nigeria, the road to university runs through a set of exams.",
          "The company's own words describe how that road feels. \"Preparing for university can feel like an uphill battle, especially when you're doing it on your own.\"",
          "So the exam meant to open the door becomes the thing that keeps some people outside it.",
          "AcemyX describes itself as an online platform that helps learners prepare for university admission exams and other academic or professional assessments, using personalized tools, curated resources and self-paced learning. Its venture profile, on The Resolution Project, states the aim in larger terms: to democratize access to tertiary education for underprivileged university aspirants in Nigeria.",
          "One heading on the site holds the whole idea. \"Navigating Entrance Exams Shouldn't Be a Barrier.\"",
          "The user is a student with an exam date and a school in mind. Read against what the product offers, three goals stand out.",
          "The first is to know where to focus. The site promises a personal plan built around the student's goals, and tools that show where to spend effort to gain the most points.",
          "The second is to practise under real conditions. AcemyX offers expert questions and full mock exams, with progress tracking and performance analytics so a student can see whether the work is paying off.",
          "The third is to not be stuck alone. The site describes an AI tutor that guides a student through a problem step by step instead of handing over the answer, alongside mentors and a study community."
        ],
        "image": {
          "alt": "The homepage section introducing the AI tutor",
          "placeholder": "The homepage section introducing the AI tutor"
        }
      },
      {
        "heading": "Defining Success",
        "body": [
          "The pricing is public, and it says a lot.",
          "An individual pays N500 per month, or N1,200 for three months paid upfront. There is a free trial. A separate Enterprise plan offers institutions custom pricing, scaled access for students and a sales contact.",
          "The product's shape suggests two needs.",
          "A price this low only works at volume, so the business needs many students to try it, pay, and stay through an exam season. The three-month plan reads as a way to keep a student for the full run of their preparation.",
          "The Enterprise plan suggests a second route, where a school or a foundation pays on behalf of many students at once. That fits the mission, because the students the venture profile describes are the ones least able to pay for themselves.",
          "The site also speaks to that audience directly, with a section headed \"Trusted by Leading Educators and Foundations.\""
        ],
        "image": {
          "alt": "The pricing section with its Individual and Enterprise toggle",
          "placeholder": "The pricing section with its Individual and Enterprise toggle"
        }
      },
      {
        "heading": "The Decision",
        "body": [
          "A product like this asks two things of design.",
          "The identity has to earn trust twice: from a student deciding whether N500 is worth it, and from an institution deciding whether to put its name beside it.",
          "The digital side has to make a plan, a mock exam and a progress report readable to someone studying alone, often for the first time.",
          "I was the only designer, working with the founder and the developers, from February 2024 to September 2025."
        ]
      }
    ]
  }
}
