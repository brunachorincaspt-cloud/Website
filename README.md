# Bruna Chorincas — portfolio site

A static site. No build step, no dependencies — just HTML, one stylesheet and one
small JavaScript file. Open `index.html` in a browser and it works.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home. Full-screen photo slideshow, no scrolling. |
| `portfolio.html` | The work grid, plus the About and Contact sections. |
| `chin-up.html` … `camp.html` | One page per project (8 of them). |
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

## A note on the photographs

The images in `images/` live in this repository — they load from here and will keep
working no matter what.

The rest are still hot-linked from the old Wix site (`static.wixstatic.com`): the
home-page slideshow, the About portrait, and 51 of the 59 tiles in the portfolio
grid. **If that Wix site is ever taken down or the account closes, those images
disappear from this site.** Worth replacing them with local files at some point.

## Publishing with GitHub Pages

Repository → Settings → Pages → Source: *Deploy from a branch*, branch `main`,
folder `/ (root)`. The site is live a minute later. `.nojekyll` is there to stop
GitHub's Jekyll step from touching the files.

To use a custom domain, add a file called `CNAME` in the root containing just the
domain name, then point the domain's DNS at GitHub.
