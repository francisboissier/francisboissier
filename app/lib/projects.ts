export type GalleryItem = {
  kind: "image" | "video";
  slug: string;
  title: string;
  src: string;
  poster?: string;
  width: number;
  height: number;
  ratio: number;
};

export type Project = {
  slug: string;
  title: string;
  count: number;
  cover: GalleryItem;
  items: GalleryItem[];
};

export const projects: Project[] = [
  {
    "slug": "replicaman",
    "title": "Replicaman",
    "count": 1,
    "cover": {
      "kind": "video",
      "slug": "replicaman",
      "title": "Replicaman",
      "src": "/Website-Video_1.mp4",
      "width": 1470,
      "height": 1080,
      "ratio": 1.3611,
      "poster": "/replicaman-poster.jpg"
    },
    "items": [
      {
        "kind": "video",
        "slug": "replicaman",
        "title": "Replicaman",
        "src": "/Website-Video_1.mp4",
        "width": 1470,
        "height": 1080,
        "ratio": 1.3611,
        "poster": "/replicaman-poster.jpg"
      }
    ]
  },
  {
    "slug": "heroine",
    "title": "Heroine",
    "count": 3,
    "cover": {
      "kind": "image",
      "slug": "heroine",
      "title": "Heroine",
      "src": "/heroine-mag/SnapInsta.to_627212186_18553134292051803_6463254907616104858_n.jpg",
      "width": 1350,
      "height": 1687,
      "ratio": 0.8002
    },
    "items": [
      {
        "kind": "image",
        "slug": "heroine",
        "title": "Heroine",
        "src": "/heroine-mag/SnapInsta.to_627212186_18553134292051803_6463254907616104858_n.jpg",
        "width": 1350,
        "height": 1687,
        "ratio": 0.8002
      },
      {
        "kind": "image",
        "slug": "heroine",
        "title": "Heroine",
        "src": "/heroine-mag/SnapInsta.to_670652632_18574060702051803_8213018663567811149_n.jpg",
        "width": 1440,
        "height": 938,
        "ratio": 1.5352
      },
      {
        "kind": "image",
        "slug": "heroine",
        "title": "Heroine",
        "src": "/heroine-mag/SnapInsta.to_671005990_18574060693051803_3006768832488274416_n.jpg",
        "width": 1440,
        "height": 941,
        "ratio": 1.5303
      }
    ]
  },
  {
    "slug": "manner",
    "title": "Manner",
    "count": 7,
    "cover": {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_563279148_18526398844051803_6728258116829190117_n.jpg",
      "width": 1440,
      "height": 1080,
      "ratio": 1.3333
    },
    "items": [
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_563279148_18526398844051803_6728258116829190117_n.jpg",
        "width": 1440,
        "height": 1080,
        "ratio": 1.3333
      },
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_563355375_18526398847051803_3270804040196190977_n.jpg",
        "width": 1440,
        "height": 1080,
        "ratio": 1.3333
      },
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_563779015_18526398856051803_6624938147006694515_n.jpg",
        "width": 1440,
        "height": 1080,
        "ratio": 1.3333
      },
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_563782644_18526398829051803_3033678615898165326_n.jpg",
        "width": 1440,
        "height": 1079,
        "ratio": 1.3346
      },
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_564078429_18526398055051803_3424275402340929766_n.jpg",
        "width": 1440,
        "height": 1878,
        "ratio": 0.7668
      },
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_564189866_18526398031051803_5092900383003315317_n.jpg",
        "width": 1440,
        "height": 1878,
        "ratio": 0.7668
      },
      {
        "kind": "image",
        "slug": "manner",
        "title": "Manner",
        "src": "/manner-mag/SnapInsta.to_565055265_18526398046051803_205160423001412095_n.jpg",
        "width": 1440,
        "height": 1878,
        "ratio": 0.7668
      }
    ]
  },
  {
    "slug": "practice",
    "title": "Practice",
    "count": 7,
    "cover": {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_728152464_18597368368051803_6941606075923491605_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    },
    "items": [
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_728152464_18597368368051803_6941606075923491605_n.jpg",
        "width": 3211,
        "height": 4096,
        "ratio": 0.7839
      },
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_730397753_18597368668051803_2227108476034977685_n.jpg",
        "width": 3211,
        "height": 4096,
        "ratio": 0.7839
      },
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_731185573_18597368104051803_8201140762434583194_n.jpg",
        "width": 3211,
        "height": 4096,
        "ratio": 0.7839
      },
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_735205308_18597368563051803_1407355845734745586_n.jpg",
        "width": 3211,
        "height": 4096,
        "ratio": 0.7839
      },
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_742002939_18597368542051803_3792821367985397564_n.jpg",
        "width": 3211,
        "height": 4096,
        "ratio": 0.7839
      },
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_743519202_18597368266051803_1490367124750729987_n.jpg",
        "width": 3211,
        "height": 4096,
        "ratio": 0.7839
      },
      {
        "kind": "image",
        "slug": "practice",
        "title": "Practice",
        "src": "/practice-magazine/SnapInsta.to_743806079_18597368599051803_8658909212123186140_n.jpg",
        "width": 3221,
        "height": 4096,
        "ratio": 0.7864
      }
    ]
  },
  {
    "slug": "the-homme-plus",
    "title": "The Homme Plus",
    "count": 3,
    "cover": {
      "kind": "image",
      "slug": "the-homme-plus",
      "title": "The Homme Plus",
      "src": "/thehommeplusmag/SnapInsta.to_672375168_18580374178051803_7347130399388566586_n.jpg",
      "width": 3140,
      "height": 4096,
      "ratio": 0.7666
    },
    "items": [
      {
        "kind": "image",
        "slug": "the-homme-plus",
        "title": "The Homme Plus",
        "src": "/thehommeplusmag/SnapInsta.to_672375168_18580374178051803_7347130399388566586_n.jpg",
        "width": 3140,
        "height": 4096,
        "ratio": 0.7666
      },
      {
        "kind": "image",
        "slug": "the-homme-plus",
        "title": "The Homme Plus",
        "src": "/thehommeplusmag/SnapInsta.to_703762740_18582641020051803_1380896339128992959_n.jpg",
        "width": 2073,
        "height": 2701,
        "ratio": 0.7675
      },
      {
        "kind": "image",
        "slug": "the-homme-plus",
        "title": "The Homme Plus",
        "src": "/thehommeplusmag/SnapInsta.to_704267199_18582641011051803_2872444676454705218_n.jpg",
        "width": 1906,
        "height": 2484,
        "ratio": 0.7673
      }
    ]
  },
  {
    "slug": "ed-sheeran",
    "title": "Ed Sheeran",
    "count": 6,
    "cover": {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_584079371_18532679674051803_5359096121863032758_n.jpg",
      "width": 1440,
      "height": 1878,
      "ratio": 0.7668
    },
    "items": [
      {
        "kind": "image",
        "slug": "ed-sheeran",
        "title": "Ed Sheeran",
        "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_584079371_18532679674051803_5359096121863032758_n.jpg",
        "width": 1440,
        "height": 1878,
        "ratio": 0.7668
      },
      {
        "kind": "image",
        "slug": "ed-sheeran",
        "title": "Ed Sheeran",
        "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_586683623_18536630095051803_5021575998721420706_n.jpg",
        "width": 977,
        "height": 637,
        "ratio": 1.5338
      },
      {
        "kind": "image",
        "slug": "ed-sheeran",
        "title": "Ed Sheeran",
        "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_586688707_18536630110051803_3442984520929843781_n.jpg",
        "width": 757,
        "height": 493,
        "ratio": 1.5355
      },
      {
        "kind": "image",
        "slug": "ed-sheeran",
        "title": "Ed Sheeran",
        "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_587790368_18536630113051803_2479063694014944205_n.jpg",
        "width": 979,
        "height": 639,
        "ratio": 1.5321
      },
      {
        "kind": "image",
        "slug": "ed-sheeran",
        "title": "Ed Sheeran",
        "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_589358343_18536630116051803_130891875757074093_n.jpg",
        "width": 980,
        "height": 641,
        "ratio": 1.5289
      },
      {
        "kind": "image",
        "slug": "ed-sheeran",
        "title": "Ed Sheeran",
        "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_591029250_18537254023051803_3317672101623441931_n.jpg",
        "width": 1333,
        "height": 1778,
        "ratio": 0.7497
      }
    ]
  }
];

export const galleryRows: GalleryItem[][] = [
  [
    {
      "kind": "image",
      "slug": "heroine",
      "title": "Heroine",
      "src": "/heroine-mag/SnapInsta.to_627212186_18553134292051803_6463254907616104858_n.jpg",
      "width": 1350,
      "height": 1687,
      "ratio": 0.8002
    },
    {
      "kind": "video",
      "slug": "replicaman",
      "title": "Replicaman",
      "src": "/Website-Video_1.mp4",
      "width": 1470,
      "height": 1080,
      "ratio": 1.3611,
      "poster": "/replicaman-poster.jpg"
    },
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_563279148_18526398844051803_6728258116829190117_n.jpg",
      "width": 1440,
      "height": 1080,
      "ratio": 1.3333
    }
  ],
  [
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_728152464_18597368368051803_6941606075923491605_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    },
    {
      "kind": "image",
      "slug": "the-homme-plus",
      "title": "The Homme Plus",
      "src": "/thehommeplusmag/SnapInsta.to_672375168_18580374178051803_7347130399388566586_n.jpg",
      "width": 3140,
      "height": 4096,
      "ratio": 0.7666
    },
    {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_584079371_18532679674051803_5359096121863032758_n.jpg",
      "width": 1440,
      "height": 1878,
      "ratio": 0.7668
    },
    {
      "kind": "image",
      "slug": "heroine",
      "title": "Heroine",
      "src": "/heroine-mag/SnapInsta.to_670652632_18574060702051803_8213018663567811149_n.jpg",
      "width": 1440,
      "height": 938,
      "ratio": 1.5352
    }
  ],
  [
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_563355375_18526398847051803_3270804040196190977_n.jpg",
      "width": 1440,
      "height": 1080,
      "ratio": 1.3333
    },
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_730397753_18597368668051803_2227108476034977685_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    },
    {
      "kind": "image",
      "slug": "the-homme-plus",
      "title": "The Homme Plus",
      "src": "/thehommeplusmag/SnapInsta.to_703762740_18582641020051803_1380896339128992959_n.jpg",
      "width": 2073,
      "height": 2701,
      "ratio": 0.7675
    }
  ],
  [
    {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_586683623_18536630095051803_5021575998721420706_n.jpg",
      "width": 977,
      "height": 637,
      "ratio": 1.5338
    },
    {
      "kind": "image",
      "slug": "heroine",
      "title": "Heroine",
      "src": "/heroine-mag/SnapInsta.to_671005990_18574060693051803_3006768832488274416_n.jpg",
      "width": 1440,
      "height": 941,
      "ratio": 1.5303
    },
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_563779015_18526398856051803_6624938147006694515_n.jpg",
      "width": 1440,
      "height": 1080,
      "ratio": 1.3333
    },
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_731185573_18597368104051803_8201140762434583194_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    }
  ],
  [
    {
      "kind": "image",
      "slug": "the-homme-plus",
      "title": "The Homme Plus",
      "src": "/thehommeplusmag/SnapInsta.to_704267199_18582641011051803_2872444676454705218_n.jpg",
      "width": 1906,
      "height": 2484,
      "ratio": 0.7673
    },
    {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_586688707_18536630110051803_3442984520929843781_n.jpg",
      "width": 757,
      "height": 493,
      "ratio": 1.5355
    },
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_563782644_18526398829051803_3033678615898165326_n.jpg",
      "width": 1440,
      "height": 1079,
      "ratio": 1.3346
    }
  ],
  [
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_735205308_18597368563051803_1407355845734745586_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    },
    {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_587790368_18536630113051803_2479063694014944205_n.jpg",
      "width": 979,
      "height": 639,
      "ratio": 1.5321
    },
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_564078429_18526398055051803_3424275402340929766_n.jpg",
      "width": 1440,
      "height": 1878,
      "ratio": 0.7668
    },
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_742002939_18597368542051803_3792821367985397564_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    }
  ],
  [
    {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_589358343_18536630116051803_130891875757074093_n.jpg",
      "width": 980,
      "height": 641,
      "ratio": 1.5289
    },
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_564189866_18526398031051803_5092900383003315317_n.jpg",
      "width": 1440,
      "height": 1878,
      "ratio": 0.7668
    },
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_743519202_18597368266051803_1490367124750729987_n.jpg",
      "width": 3211,
      "height": 4096,
      "ratio": 0.7839
    }
  ],
  [
    {
      "kind": "image",
      "slug": "ed-sheeran",
      "title": "Ed Sheeran",
      "src": "/thehommeplusmag/ed-sheeran/SnapInsta.to_591029250_18537254023051803_3317672101623441931_n.jpg",
      "width": 1333,
      "height": 1778,
      "ratio": 0.7497
    },
    {
      "kind": "image",
      "slug": "manner",
      "title": "Manner",
      "src": "/manner-mag/SnapInsta.to_565055265_18526398046051803_205160423001412095_n.jpg",
      "width": 1440,
      "height": 1878,
      "ratio": 0.7668
    },
    {
      "kind": "image",
      "slug": "practice",
      "title": "Practice",
      "src": "/practice-magazine/SnapInsta.to_743806079_18597368599051803_8658909212123186140_n.jpg",
      "width": 3221,
      "height": 4096,
      "ratio": 0.7864
    }
  ]
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

function chunkRows(items: GalleryItem[]): GalleryItem[][] {
  const rows: GalleryItem[][] = [];
  let rest = items;
  let wide = true;
  while (rest.length) {
    let size = wide ? 4 : 3;
    if (rest.length - size === 1) size += 1;
    if (rest.length < size) size = rest.length;
    rows.push(rest.slice(0, size));
    rest = rest.slice(size);
    wide = !wide;
  }
  return rows;
}

export const stillsGroups = projects
  .filter((project) => project.cover.kind === "image")
  .map((project) => ({
    slug: project.slug,
    title: project.title,
    rows: chunkRows(project.items),
  }));

export type Film = {
  slug: string;
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  ratio: number;
};

export const films: Film[] = [
  {
    slug: "replicaman",
    title: "Replicaman",
    src: "/Website-Video_1.mp4",
    poster: "/replicaman-poster.jpg",
    width: 1470,
    height: 1080,
    ratio: 1.3611,
  },
  {
    slug: "ed-sheeran-film",
    title: "Ed Sheeran",
    src: "/AH-_ED_SHEERAN_WATCH_VID_01.mp4",
    poster: "/ed-sheeran-film-poster.jpg",
    width: 1920,
    height: 1080,
    ratio: 1.7778,
  },
  {
    slug: "manner-film",
    title: "Manner",
    src: "/FB_MANNER_VIDEO_01.mp4",
    poster: "/manner-film-poster.jpg",
    width: 720,
    height: 576,
    ratio: 1.25,
  },
  {
    slug: "maya-chanel",
    title: "Maya Chanel",
    src: "/FB_MAYA_CHANEL_VIDEO_01.mp4",
    poster: "/maya-chanel-poster.jpg",
    width: 1440,
    height: 1080,
    ratio: 1.3333,
  },
];

export const filmRows: Film[][] = films.reduce<Film[][]>((rows, film, index) => {
  if (index % 2 === 0) rows.push([film]);
  else rows[rows.length - 1].push(film);
  return rows;
}, []);
