# Bruna Chorincas — portfolio site

A static site. No build step, no dependencies — just HTML, one stylesheet and one
small JavaScript file. Open `index.html` in a browser and it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home. Full-screen photo slideshow, no scrolling. |
| `portfolio.html` | The work grid, plus the About and Contact sections. |
| `chin-up.html` … `narah-soleigh.html` | One page per project (16 of them). |
| `404.html` | Shown when a URL doesn't exist. |

## Folders

| Folder | What's in it |
| --- | --- |
| `css/style.css` | Every style for every page. Colours are at the top, in `:root`. |
| `js/site.js` | Menu, header-on-scroll, slideshow, gallery filters. |
| `images/` | The photographs, one folder per project. |
| `drafts/` | Earlier versions, kept for reference. Nothing links to them. |

## Making changes

**Change a colour, font or spacing** — `css/style.css`. The variables at the very
top (`--paper`, `--ink`, `--fog`…) control the palette everywhere at once.

**Add photos to a project** — drop the files into that project's folder in
`images/`, then add a tile to the project page:

```html
<div class="frame show">
  <img src="images/camp/15.jpg" alt="CAMP — Experimenting with Photography and Styling" loading="lazy">
</div>
```

**Add a whole new project** — copy an existing project page (say `still-life.html`),
change the title, the description and the tiles, then add a linked tile to the grid
in `portfolio.html`:

```html
<a href="new-project.html" class="frame show" data-cat="styling">
  <img src="images/new-project/01.jpg" alt="New Project" loading="lazy">
  <span class="frame-cap">New Project</span>
</a>
```

Also update the `← previous` / `next →` links at the bottom of the neighbouring
project pages so the sequence stays unbroken.

**Filter categories** — a tile is filtered by its `data-cat`. Use `styling`,
`video` or `content`. A tile can sit in more than one: `data-cat="styling content"`.
A category with nothing in it shows "Nothing here yet" rather than an empty page —
Videography is in that state at the moment.

**Projects, in the order they appear:** Chin Up, Kate Parks, Reverse, Gabriel
Custódio, Street Style: LFW, John Smedley, Now You Live, Still Life, Matilda
Holttum, Emma Hayward-H, CAMP, Historical Palace Fashion Film, Emerging
Designers Promotion, Threads Styling, Short Film, Narah Soleigh.

The five films sit at positions 3, 6, 9, 12 and 15 so they are spread through
the grid rather than bunched at the end. The previous/next links on the project
pages follow this same order, so clicking through matches the grid.

## Films

Films are embedded from YouTube rather than stored here — video files are far
too large for a repository, and YouTube handles the player, the quality
switching and the phone playback for free. Views still count towards the
channel.

To add one, put this at the top of a project page, above the photo grid:

```html
<div class="project-video">
  <div class="video-frame">
    <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
            title="Project name" loading="lazy" allowfullscreen
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
  </div>
</div>
```

`VIDEO_ID` is the part after `v=` in a YouTube address. Add `vertical` to the
first line (`class="project-video vertical"`) for a Short, which switches the
frame from 16:9 to 9:16 and stops it being stretched across the page.

The embeds use `youtube-nocookie.com`, which holds off on tracking the viewer
until they actually press play.

A project can be both stills and film: give its tile `data-cat="styling video"`
and it appears under both filters. Reverse and John Smedley work this way.

Tiles for film projects use YouTube's own still as the cover. Replacing that
with your own photograph is just a matter of swapping the `src`.

A film tile plays its YouTube video in place, muted and looping. The player is
built only once the tile is scrolled to and pauses when it leaves the screen,
so a phone never runs five at once. Anyone who has asked for reduced motion, or
whose device has asked sites to save data, keeps the still instead.

The player sits under a `pointer-events:none` layer, which is what keeps the
tile clickable — without it the iframe swallows the click and the project page
never opens.

Dropping a clip into `images/clips/` named after the project takes over from
the YouTube player for that tile, which is lighter and looks more like the rest
of the site. See `images/clips/README.md` for what to export.

## A note on the photographs

The images in `images/` live in this repository — they load from here and will keep
working no matter what.

44 photographs are still hot-linked from the old Wix site
(`static.wixstatic.com`): the home-page slideshow, the About portrait, and the
photographs inside Reverse, Emerging Designers, John Smedley, Threads Styling,
and the four newest in Emma Hayward-H. **If that Wix site is ever taken down or
the account closes, those images disappear from this site.** Replacing them with
local files is the single most valuable bit of housekeeping left.

## Publishing with GitHub Pages

Repository → Settings → Pages → Source: *Deploy from a branch*, branch `main`,
folder `/ (root)`. The site is live a minute later. `.nojekyll` is there to stop
GitHub's Jekyll step from touching the files.

To use a custom domain, add a file called `CNAME` in the root containing just the
domain name, then point the domain's DNS at GitHub.
