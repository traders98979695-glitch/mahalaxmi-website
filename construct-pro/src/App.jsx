import { useState, useEffect, useRef, Fragment, createElement as _createElement } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Menu,
  Minus,
  MoveUpRight,
  Phone,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Toaster, toast } from "./components/ui/sonner";
import { supabase } from "./lib/supabaseClient";
import "./App.css";

// react/jsx-dev-runtime only exports jsxDEV in development builds; production
// builds strip it, which crashes the app on load. This shim reproduces the
// same call signature using the always-available createElement API.
function jsxDEV(type, config, maybeKey) {
  const props = maybeKey !== undefined ? { ...config, key: maybeKey } : config;
  return _createElement(type, props);
}











const ASSET = '/assets/';
const PROFILE = `${ASSET}mahalaxmi-company-profile.pdf`;
const EMAIL = 'mahalaxmiconstruction2011@yahoo.com';
const PHONE = '+919825133187';
const EASE = [0.22, 1, 0.36, 1];
const NAV = [['about', 'Our company'], ['expertise', 'Expertise'], ['projects', 'Our work'], ['quality', 'Our commitment']];
const SERVICES = [{
  title: 'Industrial & civil construction',
  text: 'From foundations to finished facilities. Civil construction for industrial plants, buildings and infrastructure, backed by experienced teams and owned equipment.',
  tags: ['Industrial plants', 'RCC buildings', 'Civil works'],
  image: 'industrial-building',
  icon: '01'
}, {
  title: 'Infrastructure & site development',
  text: 'Preparing the ground for progress. Earthwork, excavation, site development and RCC roads delivered with an execution-first approach.',
  tags: ['Site development', 'Earthwork', 'RCC roads'],
  image: 'site-development',
  icon: '02'
}, {
  title: 'Water-retaining structures & ETP',
  text: 'Civil works for effluent treatment plants and RCC water-retaining structures, with attention to bottom slabs, side walls and water-tight construction.',
  tags: ['Effluent treatment plants', 'RCC water tanks', 'Reservoirs'],
  image: 'water-reservoir',
  icon: '03'
}, {
  title: 'Waterproofing & injection grouting',
  text: 'Specialist protection for long-term performance. Waterproofing, Shahabad box-type treatment, hydro testing and injection grouting for demanding environments.',
  tags: ['Waterproofing', 'Hydro testing', 'Injection grouting'],
  image: 'waterproofing',
  icon: '04'
}, {
  title: 'Industrial flooring & finishing',
  text: 'Durable surfaces built around the work they support. RCC workshop floor slabs, vacuum Trimix finishing and floor-hardener applications.',
  tags: ['Workshop floors', 'Vacuum Trimix', 'Floor hardeners'],
  image: 'floor-finishing',
  icon: '05'
}, {
  title: 'Pharmaceutical civil works',
  text: 'Purposeful civil and finishing work for pharmaceutical environments, including Kota stone coving and works aligned with applicable rules and regulations.',
  tags: ['Pharma facilities', 'Kota stone coving', 'Specialist finishing'],
  image: 'civil-works',
  icon: '06'
}];
const PROJECTS = [{
  id: '01',
  title: 'Built for industry.',
  category: 'Industrial',
  scope: 'Industrial building & facility works',
  image: 'industrial-building',
  description: 'Completed industrial building featured in our company portfolio. A view of our civil construction, building delivery and finishing capabilities.',
  service: SERVICES[0].title
}, {
  id: '02',
  title: 'Strength in every connection.',
  category: 'Industrial',
  scope: 'Structural steel works',
  image: 'industrial-steel',
  description: 'Structural steel work from our project portfolio. Industrial construction that brings together structural coordination and hands-on site execution.',
  service: SERVICES[0].title
}, {
  id: '03',
  title: 'Progress from the ground up.',
  category: 'Infrastructure',
  scope: 'Earthwork & site development',
  image: 'site-development',
  description: 'Infrastructure and site development work shown in our company profile, including earthwork and site preparation for construction.',
  service: SERVICES[1].title
}, {
  id: '04',
  title: 'Precision. Poured into place.',
  category: 'Infrastructure',
  scope: 'RCC construction works',
  image: 'rcc-construction',
  description: 'On-site RCC construction from our project portfolio. Formwork and structural civil execution carried out by our site teams.',
  service: SERVICES[0].title
}, {
  id: '05',
  title: 'Protection beneath the surface.',
  category: 'Specialist',
  scope: 'Waterproofing & stone work',
  image: 'waterproofing',
  description: 'Waterproofing and stone-related work featured in our specialist capabilities. Practical protection for water-retaining and below-ground structures.',
  service: SERVICES[3].title
}, {
  id: '06',
  title: 'Finished for performance.',
  category: 'Specialist',
  scope: 'Industrial floor finishing',
  image: 'floor-finishing',
  description: 'RCC workshop floor finishing shown in our company profile, representing our vacuum Trimix and industrial floor-hardening capabilities.',
  service: SERVICES[4].title
}, {
  id: '07',
  title: 'Connecting what comes next.',
  category: 'Infrastructure',
  scope: 'Road & site development',
  image: 'road-compaction',
  description: 'Road compaction and site development from our project portfolio. Ground preparation and infrastructure works supporting industrial development.',
  service: SERVICES[1].title
}, {
  id: '08',
  title: 'A framework for the future.',
  category: 'Industrial',
  scope: 'RCC building construction',
  image: 'building-works',
  description: 'RCC building construction featured in our company profile, demonstrating our structural and civil construction capability.',
  service: SERVICES[0].title
}];
const Reveal = ({
  children,
  className = '',
  delay = 0,
  ...props
}) => {
  const reduced = useReducedMotion();
  return jsxDEV(motion.div, {
    className: className,
    initial: reduced ? false : {
      opacity: 0,
      y: 32
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true,
      amount: 0.12
    },
    transition: {
      duration: 0.85,
      ease: EASE,
      delay
    },
    ...props,
    children: children
  });
};
const Chapter = ({
  number,
  title,
  light = false
}) => jsxDEV("div", {
  className: `chapter-label ${light ? 'on-light' : ''}`,
  "data-testid": `chapter-label-${number}`,
  children: [jsxDEV("span", {
    className: "chapter-number",
    children: number
  }), jsxDEV("span", {
    children: title
  }), jsxDEV("span", {
    className: "chapter-line"
  })]
});
const Brand = ({
  footer = false
}) => jsxDEV("a", {
  className: `brand ${footer ? 'footer-brand' : ''}`,
  href: "#home",
  "aria-label": "Mahalaxmi Construction home",
  "data-testid": footer ? 'footer-brand' : 'header-brand',
  children: [jsxDEV("img", {
    src: `${ASSET}brand-symbol.webp`,
    alt: "",
    width: "60",
    height: "50"
  }), jsxDEV("span", {
    className: "brand-wordmark",
    children: ["MAHALAXMI", jsxDEV("span", {
      children: "CONSTRUCTION"
    })]
  })]
});
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), {
      rootMargin: '-20% 0px -55% 0px'
    });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return jsxDEV("header", {
    className: "site-header",
    "data-testid": "site-header",
    children: jsxDEV("div", {
      className: "nav-shell",
      children: [jsxDEV(Brand, {
      }), jsxDEV("nav", {
        className: "desktop-nav",
        "aria-label": "Main navigation",
        children: NAV.map(([id, name]) => jsxDEV("a", {
          href: `#${id}`,
          className: active === id ? 'active' : '',
          "data-testid": `nav-${id}`,
          children: name
        }, id))
      }), jsxDEV(Button, {
        asChild: true,
        className: "button button-orange header-cta",
        children: jsxDEV("a", {
          href: "#contact",
          "data-testid": "header-enquiry",
          children: ["Let's build together ", jsxDEV(ArrowUpRight, {
          })]
        })
      }), jsxDEV(Dialog, {
        open: menuOpen,
        onOpenChange: setMenuOpen,
        children: [jsxDEV(DialogTrigger, {
          asChild: true,
          children: jsxDEV(Button, {
            variant: "ghost",
            className: "mobile-menu-button",
            "aria-label": "Open navigation",
            "data-testid": "mobile-menu-toggle",
            children: jsxDEV(Menu, {})
          })
        }), jsxDEV(DialogContent, {
          className: "mobile-menu",
          "data-testid": "mobile-menu",
          "data-lenis-prevent": true,
          children: [jsxDEV(DialogTitle, {
            "data-testid": "mobile-menu-title",
            children: "Explore Mahalaxmi."
          }), jsxDEV(DialogDescription, {
            className: "sr-only",
            children: "Navigate our company, expertise, projects and contact details."
          }), jsxDEV("nav", {
            "aria-label": "Mobile navigation",
            children: [...NAV, ['contact', 'Let’s build together']].map(([id, name], index) => jsxDEV("a", {
              href: `#${id}`,
              onClick: () => setMenuOpen(false),
              "data-testid": `mobile-nav-${id}`,
              children: [jsxDEV("span", {
                children: ["0", jsxDEV("span", {
                  "data-ve-dynamic": "true",
                  style: {
                    display: "contents"
                  },
                  children: index + 1
                }, void 0, false)]
              }), name, jsxDEV(ArrowUpRight, {
              })]
            }, id))
          }), jsxDEV("a", {
            className: "text-link",
            href: PROFILE,
            download: true,
            "data-testid": "mobile-profile-download",
            children: ["Company profile ", jsxDEV(Download, {
              size: 16
            })]
          })]
        })]
      })]
    })
  });
};
const Hero = () => {
    const ref = useRef(null);
  const reduced = useReducedMotion();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  return jsxDEV("section", {
    id: "home",
    className: "hero",
    ref: ref,
    "data-testid": "hero-section",
    children: [jsxDEV(motion.div, {
      className: "hero-image",
      style: {
        y: reduced ? 0 : imageY
      },
      children: jsxDEV("img", {
        src: `${ASSET}industrial-steel.webp`,
        alt: "Mahalaxmi Construction industrial steel structure on site",
        fetchPriority: "high",
        "data-testid": "hero-image"
      })
    }), jsxDEV("div", {
      className: "hero-shade"
    }), jsxDEV("div", {
      className: "hero-grid",
      "aria-hidden": "true"
    }), jsxDEV("div", {
      className: "hero-side-label",
      "aria-hidden": "true",
      children: "PRECISION IN EVERY DIMENSION"
    }), jsxDEV("div", {
      className: "hero-content page-width",
      children: [jsxDEV(motion.div, {
        className: "hero-eyebrow",
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        transition: {
          delay: 0.15,
          duration: 0.8
        },
        "data-testid": "hero-eyebrow",
        children: [jsxDEV("span", {
          className: "status-dot"
        }), " BUILT ON EXPERIENCE. DRIVEN BY POSSIBILITY."]
      }), jsxDEV("h1", {
        className: "hero-title",
        "data-testid": "hero-title",
        children: ['BUILDING', 'WHAT’S NEXT.'].map((line, i) => jsxDEV("span", {
          className: "line-mask",
          children: jsxDEV(motion.span, {
            className: i === 1 ? 'orange-text' : '',
            initial: reduced ? false : {
              y: '110%',
              rotate: 2
            },
            animate: {
              y: 0,
              rotate: 0
            },
            transition: {
              duration: 1.3,
              delay: 0.25 + i * 0.16,
              ease: EASE
            },
            children: line
          })
        }, line))
      }), jsxDEV(motion.div, {
        className: "hero-bottom-content",
        initial: reduced ? false : {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.85,
          duration: 1,
          ease: EASE
        },
        children: [jsxDEV("p", {
          "data-testid": "hero-description",
          children: ["Industrial ambition. Engineered into reality.", jsxDEV("br", {
          }), "Your civil construction partner, building trust since 1991."]
        }), jsxDEV("div", {
          className: "hero-actions",
          children: [jsxDEV(Button, {
            asChild: true,
            className: "button button-orange",
            children: jsxDEV("a", {
              href: "#projects",
              "data-testid": "hero-explore-projects",
              children: ["Explore our work ", jsxDEV(ArrowUpRight, {
              })]
            })
          }), jsxDEV("a", {
            href: PROFILE,
            download: true,
            className: "profile-link",
            "data-testid": "hero-download-profile",
            children: [jsxDEV(Download, {
              size: 16
            }), jsxDEV("span", {
              children: ["Company profile", jsxDEV("span", {
                className: "file-meta",
                children: "PDF \xB7 3.8 MB"
              })]
            })]
          })]
        })]
      })]
    }), jsxDEV("div", {
      className: "hero-photo-caption",
      "data-testid": "hero-photo-caption",
      children: [jsxDEV("span", {
        className: "photo-cross",
        children: "+"
      }), jsxDEV("span", {
        children: ["ON SITE / IN OUR ELEMENT", jsxDEV("br", {
        }), jsxDEV("b", {
          children: "Industrial steel works"
        })]
      })]
    }), jsxDEV("div", {
      className: "hero-baseline page-width",
      children: [jsxDEV("div", {
        className: "hero-location",
        "data-testid": "hero-location",
        children: [jsxDEV(MapPin, {
          size: 13
        }), " ANKLESHWAR, GUJARAT \xB7 INDIA"]
      }), jsxDEV("a", {
        href: "#about",
        className: "scroll-cue",
        "data-testid": "hero-scroll-cue",
        children: ["SCROLL TO DISCOVER ", jsxDEV("span", {
          children: jsxDEV(ArrowDown, {
            size: 15
          })
        })]
      }), jsxDEV("span", {
        className: "hero-index",
        "aria-hidden": "true",
        children: "01 \u2014 06"
      })]
    })]
  });
};
const TrustStrip = () => jsxDEV("div", {
  className: "trust-strip",
  "data-testid": "trust-strip",
  children: jsxDEV("div", {
    className: "page-width trust-inner",
    children: [jsxDEV("div", {
      className: "trust-label",
      "data-testid": "client-intro",
      children: [jsxDEV("span", {
        className: "status-dot"
      }), " BUILT FOR INDUSTRY.", jsxDEV("br", {
      }), "TRUSTED BY ITS LEADERS."]
    }), jsxDEV("div", {
      className: "client-wordmarks",
      "data-testid": "featured-clients",
      children: [jsxDEV("span", {
        className: "client-sun",
        "data-testid": "client-sun",
        children: ["sun", jsxDEV("span", {
          children: "PHARMA"
        })]
      }), jsxDEV("span", {
        className: "client-upl",
        "data-testid": "client-upl",
        children: ["UPL", jsxDEV("span", {
          children: "OpenAg"
        })]
      }), jsxDEV("span", {
        className: "client-suzuki",
        "data-testid": "client-suzuki",
        children: [jsxDEV("span", {
          children: "\u224B"
        }), " SUZUKI"]
      }), jsxDEV("span", {
        className: "client-ion",
        "data-testid": "client-ion",
        children: ["ION EXCHANGE", jsxDEV("small", {
          children: "Water & Environment Management"
        })]
      }), jsxDEV("span", {
        className: "client-sakata",
        "data-testid": "client-sakata",
        children: "SAKATA INX"
      })]
    })]
  })
});
const Foundations = () => jsxDEV("section", {
  id: "about",
  className: "foundations section-light",
  "data-testid": "about-section",
  children: jsxDEV("div", {
    className: "page-width",
    children: [jsxDEV(Reveal, {
      children: jsxDEV(Chapter, {
        number: "01",
        title: "THE FOUNDATION",
        light: true
      })
    }), jsxDEV("div", {
      className: "intro-grid",
      children: [jsxDEV(Reveal, {
        children: jsxDEV("h2", {
          className: "section-title",
          "data-testid": "about-title",
          children: ["WE DON\u2019T JUST", jsxDEV("br", {
          }), "BUILD STRUCTURES.", jsxDEV("br", {
          }), jsxDEV("span", {
            className: "muted-light",
            children: "WE BUILD TRUST."
          })]
        })
      }), jsxDEV(Reveal, {
        className: "intro-copy",
        delay: 0.12,
        children: [jsxDEV("span", {
          className: "small-label",
          "data-testid": "about-eyebrow",
          children: "MAHALAXMI CONSTRUCTION / MAHA LAXMI GROUP"
        }), jsxDEV("p", {
          "data-testid": "about-description",
          children: "Behind every lasting structure is a stronger partnership."
        }), jsxDEV("p", {
          className: "body-copy",
          "data-testid": "about-details",
          children: "Since 1991, we\u2019ve brought experience, accountability and hands-on expertise to industrial and infrastructure construction. From our base in Ankleshwar, Gujarat, we help turn complex requirements into work that stands the test of time."
        }), jsxDEV("a", {
          href: "#approach",
          className: "text-link dark-link",
          "data-testid": "about-story-link",
          children: ["The principles behind our work ", jsxDEV(ArrowUpRight, {
            size: 18
          })]
        })]
      })]
    }), jsxDEV(Reveal, {
      className: "stats-grid",
      children: [jsxDEV("div", {
        "data-testid": "stat-established",
        children: [jsxDEV("span", {
          className: "stat-value",
          children: ["1991", jsxDEV("span", {
            children: "\u2014"
          })]
        }), jsxDEV("span", {
          className: "stat-label",
          children: "THE YEAR OUR STORY BEGAN"
        })]
      }), jsxDEV("div", {
        "data-testid": "stat-clients",
        children: [jsxDEV("span", {
          className: "stat-value",
          children: ["24", jsxDEV("span", {
            children: "+"
          })]
        }), jsxDEV("span", {
          className: "stat-label",
          children: "CLIENTS LISTED IN OUR PROFILE"
        })]
      }), jsxDEV("div", {
        "data-testid": "stat-quality",
        children: [jsxDEV("span", {
          className: "stat-value stat-iso",
          children: ["ISO", jsxDEV("span", {
            children: " 9001:2015"
          })]
        }), jsxDEV("span", {
          className: "stat-label",
          children: "DOCUMENTED QUALITY COMMITMENT"
        })]
      })]
    })]
  })
});
const Expertise = () => {
    const [selected, setSelected] = useState(0);
  return jsxDEV("section", {
    id: "expertise",
    className: "expertise section-dark",
    "data-testid": "expertise-section",
    children: jsxDEV("div", {
      className: "page-width",
      children: [jsxDEV(Reveal, {
        children: [jsxDEV(Chapter, {
          number: "02",
          title: "OUR EXPERTISE"
        }), jsxDEV("div", {
          className: "section-heading-row",
          children: [jsxDEV("h2", {
            className: "section-title",
            "data-testid": "expertise-title",
            children: ["BIG AMBITIONS.", jsxDEV("br", {
            }), jsxDEV("span", {
              className: "muted-dark",
              children: "BUILT-IN EXPERTISE."
            })]
          }), jsxDEV("p", {
            className: "body-copy",
            "data-testid": "expertise-intro",
            children: ["One experienced partner.", jsxDEV("br", {
            }), "Every critical dimension of your project."]
          })]
        })]
      }), jsxDEV("div", {
        className: "expertise-grid",
        children: [jsxDEV(Reveal, {
          className: "service-image-wrap",
          children: [jsxDEV(AnimatePresence, {
            mode: "wait",
            children: jsxDEV(motion.img, {
              src: `${ASSET}${SERVICES[selected].image}.webp`,
              alt: SERVICES[selected].title,
              initial: {
                opacity: 0,
                scale: 1.03
              },
              animate: {
                opacity: 1,
                scale: 1
              },
              exit: {
                opacity: 0
              },
              transition: {
                duration: 0.4
              },
              loading: "lazy",
              "data-testid": "service-preview-image"
            }, SERVICES[selected].image)
          }), jsxDEV("div", {
            className: "service-photo-label",
            "data-testid": "service-image-label",
            children: [jsxDEV("span", {
              children: ["CAPABILITY / ", jsxDEV("span", {
                "data-ve-dynamic": "true",
                style: {
                  display: "contents"
                },
                children: SERVICES[selected].icon
              }, void 0, false)]
            }), jsxDEV("span", {
              children: ["MAHALAXMI CONSTRUCTION ", jsxDEV(ArrowUpRight, {
                size: 16
              })]
            })]
          }), jsxDEV("span", {
            className: "image-corner",
            "aria-hidden": "true"
          })]
        }), jsxDEV("div", {
          className: "services-list",
          children: SERVICES.map((service, index) => jsxDEV(Reveal, {
            delay: index * 0.04,
            children: jsxDEV("div", {
              className: `service-row ${selected === index ? 'selected' : ''}`,
              children: [jsxDEV("button", {
                className: "service-trigger",
                onClick: () => setSelected(selected === index ? -1 : index),
                "aria-expanded": selected === index,
                "aria-controls": `service-panel-${index}`,
                "data-testid": `service-toggle-${index}`,
                children: [jsxDEV("span", {
                  className: "service-num",
                  children: service.icon
                }), jsxDEV("span", {
                  children: service.title
                }), selected === index ? jsxDEV(Minus, {
                  size: 18
                }) : jsxDEV(Plus, {
                  size: 18
                })]
              }), jsxDEV(AnimatePresence, {
                initial: false,
                children: selected === index && jsxDEV(motion.div, {
                  id: `service-panel-${index}`,
                  initial: {
                    height: 0,
                    opacity: 0
                  },
                  animate: {
                    height: 'auto',
                    opacity: 1
                  },
                  exit: {
                    height: 0,
                    opacity: 0
                  },
                  transition: {
                    duration: 0.35
                  },
                  className: "service-details",
                  "data-testid": `service-details-${index}`,
                  children: [jsxDEV("p", {
                    children: service.text
                  }), jsxDEV("div", {
                    className: "service-tags",
                    children: service.tags.map(tag => jsxDEV("span", {
                      children: tag
                    }, tag))
                  })]
                })
              })]
            })
          }, service.icon))
        })]
      })]
    })
  });
};
const EditorialMarquee = () => jsxDEV("div", {
  className: "editorial-marquee",
  "aria-label": "Precision. Integrity. Progress.",
  "data-testid": "editorial-marquee",
  children: jsxDEV("div", {
    className: "marquee-track",
    "aria-hidden": "true",
    children: [0, 1, 2, 3].map(i => jsxDEV("span", {
      children: ["PRECISION ", jsxDEV("i", {
        children: "\u2733"
      }), " INTEGRITY ", jsxDEV("i", {
        children: "\u2733"
      }), " PROGRESS ", jsxDEV("i", {
        children: "\u2733"
      }), "\xA0"]
    }, i))
  })
});
const Projects = ({
  onEnquire
}) => {
    const [filter, setFilter] = useState('All projects');
  const [expanded, setExpanded] = useState(false);
  const [project, setProject] = useState(null);
  const filtered = PROJECTS.filter(p => filter === 'All projects' || p.category === filter);
  const displayed = filter === 'All projects' && !expanded ? filtered.slice(0, 4) : filtered;
  return jsxDEV("section", {
    id: "projects",
    className: "projects section-light",
    "data-testid": "projects-section",
    children: jsxDEV("div", {
      className: "page-width",
      children: [jsxDEV(Reveal, {
        children: [jsxDEV(Chapter, {
          number: "03",
          title: "THE WORK SPEAKS",
          light: true
        }), jsxDEV("div", {
          className: "section-heading-row",
          children: [jsxDEV("h2", {
            className: "section-title",
            "data-testid": "projects-title",
            children: ["REAL WORK.", jsxDEV("br", {
            }), jsxDEV("span", {
              className: "muted-light",
              children: "LASTING IMPACT."
            })]
          }), jsxDEV("p", {
            className: "body-copy",
            "data-testid": "projects-intro",
            children: ["A closer look at the places, structures and", jsxDEV("br", {
              className: "desktop-only"
            }), " possibilities we help bring to life."]
          })]
        })]
      }), jsxDEV(Reveal, {
        className: "project-toolbar",
        children: [jsxDEV("div", {
          className: "project-filters",
          "aria-label": "Filter projects",
          children: ['All projects', 'Industrial', 'Infrastructure', 'Specialist'].map((category, i) => jsxDEV("button", {
            className: filter === category ? 'active' : '',
            onClick: () => {
              setFilter(category);
              setExpanded(false);
            },
            "aria-pressed": filter === category,
            "data-testid": `project-filter-${i}`,
            children: [category, jsxDEV("span", {
              children: category === 'All projects' ? '08' : `0${PROJECTS.filter(p => p.category === category).length}`
            })]
          }, category))
        }), jsxDEV("span", {
          className: "small-label",
          "aria-live": "polite",
          "data-testid": "project-count",
          children: ["SHOWING ", jsxDEV("span", {
            "data-ve-dynamic": "true",
            style: {
              display: "contents"
            },
            children: String(displayed.length).padStart(2, '0')
          }, void 0, false), " / ", jsxDEV("span", {
            "data-ve-dynamic": "true",
            style: {
              display: "contents"
            },
            children: String(filtered.length).padStart(2, '0')
          }, void 0, false)]
        })]
      }), jsxDEV(Dialog, {
        open: !!project,
        onOpenChange: open => {
          if (!open) setProject(null);
        },
        children: [jsxDEV("div", {
          className: "projects-grid",
          "data-testid": "projects-grid",
          children: jsxDEV(AnimatePresence, {
            mode: "popLayout",
            children: displayed.map((p, i) => jsxDEV(motion.article, {
              layout: true,
              initial: {
                opacity: 0,
                y: 24
              },
              animate: {
                opacity: 1,
                y: 0
              },
              exit: {
                opacity: 0,
                scale: 0.98
              },
              transition: {
                duration: 0.45,
                delay: i * 0.04,
                ease: EASE
              },
              className: "project-card",
              "data-testid": `project-card-${p.id}`,
              children: jsxDEV(DialogTrigger, {
                asChild: true,
                children: jsxDEV("button", {
                  className: "project-open",
                  onClick: () => setProject(p),
                  "data-testid": `project-open-${p.id}`,
                  "aria-label": `View ${p.scope}`,
                  children: [jsxDEV("div", {
                    className: "project-image",
                    children: [jsxDEV("img", {
                      src: `${ASSET}${p.image}.webp`,
                      alt: p.scope,
                      loading: "lazy"
                    }), jsxDEV("span", {
                      className: "project-number",
                      children: [jsxDEV("span", {
                        "data-ve-dynamic": "true",
                        style: {
                          display: "contents"
                        },
                        children: p.id
                      }, void 0, false), " / SELECTED WORK"]
                    }), jsxDEV("span", {
                      className: "project-view",
                      children: ["VIEW PROJECT ", jsxDEV(ArrowUpRight, {
                        size: 18
                      })]
                    }), jsxDEV("span", {
                      className: "project-arrow",
                      children: jsxDEV(ArrowUpRight, {
                        size: 24
                      })
                    })]
                  }), jsxDEV("div", {
                    className: "project-caption",
                    children: [jsxDEV("div", {
                      children: [jsxDEV("span", {
                        className: "small-label",
                        children: [jsxDEV("span", {
                          "data-ve-dynamic": "true",
                          style: {
                            display: "contents"
                          },
                          children: p.category
                        }, void 0, false), " / ", jsxDEV("span", {
                          "data-ve-dynamic": "true",
                          style: {
                            display: "contents"
                          },
                          children: p.scope
                        }, void 0, false)]
                      }), jsxDEV("h3", {
                        children: p.title
                      })]
                    }), jsxDEV(ArrowUpRight, {
                      size: 24
                    })]
                  })]
                })
              })
            }, p.id))
          })
        }), jsxDEV(DialogContent, {
          className: "project-dialog",
          "data-testid": "project-dialog",
          "data-lenis-prevent": true,
          children: project && jsxDEV(Fragment, {
            children: [jsxDEV("div", {
              className: "dialog-image",
              children: jsxDEV("img", {
                src: `${ASSET}${project.image}.webp`,
                alt: project.scope,
                "data-testid": "project-dialog-image"
              })
            }), jsxDEV("div", {
              className: "dialog-copy",
              children: [jsxDEV("span", {
                className: "small-label orange-text",
                "data-testid": "project-dialog-category",
                children: [jsxDEV("span", {
                  "data-ve-dynamic": "true",
                  style: {
                    display: "contents"
                  },
                  children: project.category
                }, void 0, false), " / PORTFOLIO ", jsxDEV("span", {
                  "data-ve-dynamic": "true",
                  style: {
                    display: "contents"
                  },
                  children: project.id
                }, void 0, false)]
              }), jsxDEV(DialogTitle, {
                "data-testid": "project-dialog-title",
                children: project.title
              }), jsxDEV(DialogDescription, {
                "data-testid": "project-dialog-description",
                children: project.description
              }), jsxDEV("div", {
                className: "dialog-scope",
                "data-testid": "project-dialog-scope",
                children: [jsxDEV("span", {
                  children: "SCOPE OF WORK"
                }), jsxDEV("b", {
                  children: project.scope
                })]
              }), jsxDEV(Button, {
                className: "button button-orange",
                onClick: () => {
                  setProject(null);
                  onEnquire(project);
                },
                "data-testid": "project-enquire",
                children: ["Discuss a similar project ", jsxDEV(ArrowUpRight, {
                })]
              })]
            })]
          }, void 0, true)
        })]
      }), filter === 'All projects' && jsxDEV("div", {
        className: "portfolio-footer",
        children: [jsxDEV("span", {
          className: "small-label",
          "data-testid": "portfolio-source",
          children: "ACTUAL PROJECT PHOTOGRAPHY FROM OUR COMPANY PROFILE."
        }), jsxDEV(Button, {
          className: "button button-outline-dark",
          onClick: () => setExpanded(!expanded),
          "data-testid": "toggle-all-projects",
          children: [expanded ? 'Show selected projects' : 'Explore all 8 projects', expanded ? jsxDEV(Minus, {}) : jsxDEV(Plus, {})]
        })]
      })]
    })
  });
};
const Approach = () => jsxDEV("section", {
  id: "approach",
  className: "approach section-dark",
  "data-testid": "approach-section",
  children: jsxDEV("div", {
    className: "page-width",
    children: [jsxDEV(Reveal, {
      children: jsxDEV(Chapter, {
        number: "04",
        title: "THE WAY WE BUILD"
      })
    }), jsxDEV("div", {
      className: "approach-layout",
      children: [jsxDEV(Reveal, {
        className: "approach-statement",
        children: [jsxDEV("span", {
          className: "small-label orange-text",
          "data-testid": "approach-eyebrow",
          children: "STRONG PRINCIPLES. STRONGER PARTNERSHIPS."
        }), jsxDEV("h2", {
          className: "section-title",
          "data-testid": "approach-title",
          children: ["THE FOUNDATION", jsxDEV("br", {
          }), "YOU DON\u2019T SEE.", jsxDEV("br", {
          }), jsxDEV("span", {
            className: "muted-dark",
            children: ["THE DIFFERENCE", jsxDEV("br", {
            }), "YOU FEEL."]
          })]
        }), jsxDEV("p", {
          className: "body-copy",
          "data-testid": "approach-description",
          children: "Guided by Managing Director Mr. Bhailal N. Chodvadia, our approach is simple: bring the right people, take responsibility and do the work well."
        }), jsxDEV("div", {
          className: "director-signoff",
          "data-testid": "director-signoff",
          children: [jsxDEV("div", {
            className: "director-monogram",
            children: ["BC", jsxDEV("span", {
              children: "\u2197"
            })]
          }), jsxDEV("div", {
            children: [jsxDEV("strong", {
              children: "Mr. Bhailal N. Chodvadia"
            }), jsxDEV("span", {
              children: "MANAGING DIRECTOR"
            })]
          })]
        })]
      }), jsxDEV("div", {
        className: "principles",
        children: [['01', 'Integrity, without exception.', 'Honesty and accountability are not extras. They are the foundation of every client relationship and every decision we make.'], ['02', 'Expertise, on the ground.', 'Trained personnel, experienced engineers and owned equipment put practical construction capability where it matters: on site.'], ['03', 'Progress, with purpose.', 'We continually upgrade our knowledge and technology, combining dependable workmanship with a commitment to timely execution.']].map(([n, title, text]) => jsxDEV(Reveal, {
          className: "principle",
          "data-testid": `principle-${n}`,
          children: [jsxDEV("span", {
            children: [jsxDEV("span", {
              "data-ve-dynamic": "true",
              style: {
                display: "contents"
              },
              children: n
            }, void 0, false), " /"]
          }), jsxDEV("div", {
            children: [jsxDEV("h3", {
              children: title
            }), jsxDEV("p", {
              children: text
            })]
          }), jsxDEV(ArrowUpRight, {
            size: 21
          })]
        }, n))
      })]
    })]
  })
});
const Quality = () => jsxDEV("section", {
  id: "quality",
  className: "quality",
  "data-testid": "quality-section",
  children: [jsxDEV("div", {
    className: "quality-background",
    children: jsxDEV("img", {
      src: `${ASSET}rcc-construction.webp`,
      alt: "Mahalaxmi team executing RCC construction on site",
      loading: "lazy"
    })
  }), jsxDEV("div", {
    className: "quality-overlay"
  }), jsxDEV("div", {
    className: "page-width quality-content",
    children: jsxDEV(Reveal, {
      children: [jsxDEV(Chapter, {
        number: "05",
        title: "NO COMPROMISES"
      }), jsxDEV("div", {
        className: "quality-grid",
        children: [jsxDEV("div", {
          children: [jsxDEV("h2", {
            className: "section-title",
            "data-testid": "quality-title",
            children: ["SOLID WORK.", jsxDEV("br", {
            }), "SAFER SITES.", jsxDEV("br", {
            }), jsxDEV("span", {
              className: "orange-text",
              children: "EVERY DAY."
            })]
          }), jsxDEV("p", {
            "data-testid": "quality-description",
            children: ["Quality is in the details. Safety is in the culture.", jsxDEV("br", {
            }), "Neither is an afterthought."]
          })]
        }), jsxDEV("div", {
          className: "quality-card",
          "data-testid": "quality-card",
          children: [jsxDEV(ShieldCheck, {
            size: 38,
            strokeWidth: 1
          }), jsxDEV("span", {
            className: "small-label",
            children: "OUR QUALITY COMMITMENT"
          }), jsxDEV("h3", {
            children: "ISO 9001:2015"
          }), jsxDEV("p", {
            children: "Documented quality systems, dedicated quality personnel and a commitment to dependable execution."
          }), jsxDEV("ul", {
            children: [jsxDEV("li", {
              children: [jsxDEV(Check, {
                size: 15
              }), " Site safety training & toolbox meetings"]
            }), jsxDEV("li", {
              children: [jsxDEV(Check, {
                size: 15
              }), " PPE & safety awareness"]
            }), jsxDEV("li", {
              children: [jsxDEV(Check, {
                size: 15
              }), " Quality control & material testing"]
            })]
          }), jsxDEV("a", {
            href: `${PROFILE}#page=12`,
            target: "_blank",
            rel: "noreferrer",
            className: "text-link",
            "data-testid": "quality-view-certificate",
            children: ["View certification in our profile ", jsxDEV(ArrowUpRight, {
              size: 17
            })]
          })]
        })]
      })]
    })
  })]
});
const EnquiryForm = ({
  interest
}) => {
    const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  useEffect(() => {
    if (interest) {
      setValues(previous => ({
        ...previous,
        type: interest.service,
        message: `I’d like to discuss a project similar to your ${interest.scope.toLowerCase()} work.`
      }));
      setDraft(null);
      setErrors({});
    }
  }, [interest]);
  const change = event => {
    const {
      name,
      value
    } = event.target;
    setValues(previous => ({
      ...previous,
      [name]: value
    }));
    setErrors(previous => ({
      ...previous,
      [name]: ''
    }));
    setDraft(null);
  };
  const [submitting, setSubmitting] = useState(false);
  const submit = async event => {
    event.preventDefault();
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Please enter a valid email address.';
    const digits = values.phone.replace(/\D/g, '');
    if (!/^[+\d\s().-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15) next.phone = 'Please enter a valid phone number (7–15 digits).';
    if (!values.type) next.type = 'Please select a project type.';
    if (values.message.trim().length < 10) next.message = 'Please tell us a little more (at least 10 characters).';
    setErrors(next);
    if (Object.keys(next).length) {
      var _document$getElementB;
      (_document$getElementB = document.getElementById(`enquiry-${Object.keys(next)[0]}`)) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.focus();
      return;
    }
    // Save a durable backend record first — if the visitor's device has no
    // email app configured, or they close the tab before sending, the
    // enquiry still exists here rather than being lost entirely.
    setSubmitting(true);
    const { error } = await supabase.from('enquiries').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      project_type: values.type,
      message: values.message.trim()
    });
    setSubmitting(false);
    if (error) {
      toast.error('Could not save your enquiry — please try again, or email us directly.');
      return;
    }
    const body = `Hello Mahalaxmi Construction,\n\n${values.message.trim()}\n\nProject type: ${values.type}\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nPhone: ${values.phone.trim()}\n\nSent from the Mahalaxmi Construction website.`;
    const link = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project enquiry — ${values.type}`)}&body=${encodeURIComponent(body)}`;
    setDraft({
      body,
      link
    });
    window.location.href = link;
    toast('Your enquiry is ready', {
      description: 'Complete sending in your email app. Your details remain here.',
      duration: 6000
    });
  };
  const field = (name, label, placeholder, type = 'text') => jsxDEV("div", {
    className: "form-field",
    children: [jsxDEV("label", {
      htmlFor: `enquiry-${name}`,
      "data-testid": `enquiry-label-${name}`,
      children: [label, " ", jsxDEV("span", {
        children: "*"
      })]
    }), jsxDEV("input", {
      id: `enquiry-${name}`,
      name: name,
      value: values[name],
      onChange: change,
      type: type,
      placeholder: placeholder,
      autoComplete: name === 'name' ? 'name' : name === 'phone' ? 'tel' : 'email',
      maxLength: name === 'name' ? 100 : name === 'phone' ? 25 : 254,
      required: true,
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `error-${name}` : undefined,
      "data-testid": `enquiry-${name}`
    }), errors[name] && jsxDEV("span", {
      id: `error-${name}`,
      className: "field-error",
      "data-testid": `enquiry-error-${name}`,
      children: errors[name]
    })]
  });
  return jsxDEV("form", {
    className: "enquiry-form",
    noValidate: true,
    onSubmit: submit,
    "data-testid": "enquiry-form",
    children: [jsxDEV("div", {
      className: "form-heading",
      children: [jsxDEV("h3", {
        "data-testid": "enquiry-form-title",
        children: "Tell us what you have in mind."
      }), jsxDEV("span", {
        className: "small-label",
        "data-testid": "enquiry-required-note",
        children: "* REQUIRED"
      })]
    }), jsxDEV("div", {
      className: "form-grid",
      children: [field('name', 'Your name', 'Full name'), field('email', 'Email address', 'you@company.com', 'email'), field('phone', 'Phone number', '+91', 'tel'), jsxDEV("div", {
        className: "form-field",
        children: [jsxDEV("label", {
          htmlFor: "enquiry-type",
          "data-testid": "enquiry-label-type",
          children: ["Project type ", jsxDEV("span", {
            children: "*"
          })]
        }), jsxDEV("select", {
          id: "enquiry-type",
          name: "type",
          value: values.type,
          onChange: change,
          required: true,
          "aria-invalid": !!errors.type,
          "aria-describedby": errors.type ? 'error-type' : undefined,
          "data-testid": "enquiry-type",
          children: [jsxDEV("option", {
            value: "",
            children: "Select your project type"
          }), SERVICES.map(service => jsxDEV("option", {
            value: service.title,
            children: service.title
          }, service.title)), jsxDEV("option", {
            value: "Other / General enquiry",
            children: "Other / General enquiry"
          })]
        }), errors.type && jsxDEV("span", {
          id: "error-type",
          className: "field-error",
          "data-testid": "enquiry-error-type",
          children: errors.type
        })]
      })]
    }), jsxDEV("div", {
      className: "form-field",
      children: [jsxDEV("label", {
        htmlFor: "enquiry-message",
        "data-testid": "enquiry-label-message",
        children: ["A little about your project ", jsxDEV("span", {
          children: "*"
        })]
      }), jsxDEV("textarea", {
        id: "enquiry-message",
        name: "message",
        value: values.message,
        onChange: change,
        rows: 3,
        maxLength: 1800,
        required: true,
        "aria-invalid": !!errors.message,
        "aria-describedby": errors.message ? 'error-message' : undefined,
        placeholder: "Location, scope, timeline. Let's start with your vision.",
        "data-testid": "enquiry-message"
      }), errors.message && jsxDEV("span", {
        id: "error-message",
        className: "field-error",
        "data-testid": "enquiry-error-message",
        children: errors.message
      })]
    }), jsxDEV("div", {
      className: "form-submit-row",
      children: [jsxDEV("p", {
        "data-testid": "enquiry-email-notice",
        children: ["This opens your email app with a prepared enquiry.", jsxDEV("br", {
        }), "Your message is only sent when you send the email."]
      }), jsxDEV(Button, {
        type: "submit",
        className: "button button-orange",
        disabled: submitting,
        "data-testid": "enquiry-submit",
        children: [submitting ? "Saving…" : "Prepare enquiry ", !submitting && jsxDEV(ArrowUpRight, {
        })]
      })]
    }), draft && jsxDEV("div", {
      className: "draft-notice",
      role: "status",
      "data-testid": "enquiry-draft-notice",
      children: [jsxDEV(Check, {
        size: 19
      }), jsxDEV("div", {
        children: [jsxDEV("strong", {
          children: "Enquiry prepared \u2014 not sent yet."
        }), jsxDEV("p", {
          children: "Send the draft in your email app. No email app? Copy your enquiry and email it to us."
        }), jsxDEV("div", {
          className: "draft-actions",
          children: [jsxDEV("a", {
            href: draft.link,
            className: "text-link",
            "data-testid": "enquiry-open-draft",
            children: ["Open email draft ", jsxDEV(ArrowUpRight, {
              size: 14
            })]
          }), jsxDEV("button", {
            type: "button",
            className: "text-link",
            "data-testid": "enquiry-copy-draft",
            onClick: async () => {
              try {
                await navigator.clipboard.writeText(`To: ${EMAIL}\n\n${draft.body}`);
                toast.success('Enquiry copied. Paste it into an email to us.');
              } catch {
                toast.error('Clipboard unavailable. Select and copy the enquiry below.');
              }
            },
            children: ["Copy enquiry ", jsxDEV(Copy, {
              size: 14
            })]
          })]
        }), jsxDEV("details", {
          "data-testid": "enquiry-draft-details",
          children: [jsxDEV("summary", {
            "data-testid": "enquiry-draft-summary",
            children: "View prepared enquiry"
          }), jsxDEV("pre", {
            "data-testid": "enquiry-draft-text",
            children: `To: ${EMAIL}\n\n${draft.body}`
          })]
        })]
      })]
    })]
  });
};
const Contact = ({
  interest
}) => jsxDEV("section", {
  id: "contact",
  className: "contact section-dark",
  "data-testid": "contact-section",
  children: jsxDEV("div", {
    className: "page-width",
    children: [jsxDEV(Reveal, {
      children: [jsxDEV(Chapter, {
        number: "06",
        title: "YOUR NEXT CHAPTER"
      }), jsxDEV("div", {
        className: "contact-heading",
        children: [jsxDEV("h2", {
          "data-testid": "contact-title",
          children: ["GREAT THINGS", jsxDEV("br", {
          }), "START WITH ", jsxDEV("span", {
            children: "A CONVERSATION."
          })]
        }), jsxDEV(MoveUpRight, {
          className: "contact-big-arrow",
          strokeWidth: 0.7,
          "aria-hidden": "true"
        })]
      })]
    }), jsxDEV("div", {
      className: "contact-grid",
      children: [jsxDEV(Reveal, {
        className: "contact-details",
        children: [jsxDEV("p", {
          "data-testid": "contact-intro",
          children: ["Have a vision? We have the experience.", jsxDEV("br", {
          }), "Let\u2019s build something that lasts."]
        }), jsxDEV("a", {
          href: `tel:${PHONE}`,
          className: "contact-phone",
          "data-testid": "contact-phone",
          children: [jsxDEV(Phone, {
            size: 18
          }), " +91 98251 33187 ", jsxDEV(ArrowUpRight, {
            size: 20
          })]
        }), jsxDEV("a", {
          href: `mailto:${EMAIL}`,
          className: "contact-email",
          "data-testid": "contact-email",
          children: [jsxDEV(Mail, {
            size: 17
          }), jsxDEV("span", {
            children: EMAIL
          }), jsxDEV(ArrowUpRight, {
            size: 17
          })]
        }), jsxDEV("div", {
          className: "contact-address",
          "data-testid": "contact-address",
          children: [jsxDEV(MapPin, {
            size: 19
          }), jsxDEV("div", {
            children: [jsxDEV("span", {
              className: "small-label",
              children: "COME FIND US"
            }), jsxDEV("address", {
              children: ["F.F-114, Anmol Plaza Complex-2,", jsxDEV("br", {
              }), "Opp. G.I.D.C Bus Stop,", jsxDEV("br", {
              }), "Ankleshwar, Gujarat \u2013 393002, India"]
            })]
          })]
        }), jsxDEV("a", {
          className: "text-link",
          href: PROFILE,
          download: true,
          "data-testid": "contact-download-profile",
          children: ["Get to know us better ", jsxDEV("span", {
            className: "file-meta",
            children: "COMPANY PROFILE"
          }), jsxDEV(Download, {
            size: 17
          })]
        })]
      }), jsxDEV(Reveal, {
        delay: 0.1,
        children: jsxDEV(EnquiryForm, {
          interest: interest
        })
      })]
    })]
  })
});
const Footer = () => jsxDEV("footer", {
  className: "footer",
  "data-testid": "site-footer",
  children: jsxDEV("div", {
    className: "page-width",
    children: [jsxDEV("div", {
      className: "footer-top",
      children: [jsxDEV(Brand, {
        footer: true
      }), jsxDEV("p", {
        "data-testid": "footer-tagline",
        children: ["Engineering possibilities.", jsxDEV("br", {
        }), "Building trust since 1991."]
      }), jsxDEV("a", {
        href: "#home",
        className: "back-top",
        "data-testid": "back-to-top",
        children: ["BACK TO TOP ", jsxDEV("span", {
          children: jsxDEV(ArrowUp, {
            size: 18
          })
        })]
      })]
    }), jsxDEV("div", {
      className: "footer-word",
      "aria-hidden": "true",
      children: ["MAHALAXMI", jsxDEV("span", {
        children: "\u2197"
      })]
    }), jsxDEV("div", {
      className: "footer-bottom",
      children: [jsxDEV("span", {
        "data-testid": "copyright",
        children: ["\xA9 ", jsxDEV("span", {
          "data-ve-dynamic": "true",
          style: {
            display: "contents"
          },
          children: new Date().getFullYear()
        }, void 0, false), " Mahalaxmi Construction. All rights reserved."]
      }), jsxDEV("span", {
        "data-testid": "footer-location",
        children: "ROOTED IN GUJARAT. BUILT FOR PROGRESS."
      }), jsxDEV("span", {
        "data-testid": "footer-group",
        children: "A MAHA LAXMI GROUP COMPANY"
      })]
    })]
  })
});
function App() {
    const reduced = useReducedMotion();
  const lenisRef = useRef(null);
  const [interest, setInterest] = useState(null);
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      anchors: {
        offset: -100
      }
    });
    lenisRef.current = lenis;
    let frame;
    const raf = time => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);
  const enquire = project => {
    setInterest({
      ...project
    });
    setTimeout(() => {
      var _document$getElementB2;
      if (lenisRef.current) lenisRef.current.scrollTo('#contact', {
        offset: -90
      });else (_document$getElementB2 = document.getElementById('contact')) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.scrollIntoView({
        behavior: 'auto'
      });
    }, 200);
  };
  return jsxDEV(MotionConfig, {
    reducedMotion: "user",
    children: jsxDEV("div", {
      className: "site",
      children: [jsxDEV("a", {
        className: "skip-link",
        href: "#about",
        "data-testid": "skip-to-content",
        children: "Skip to content"
      }), jsxDEV(Header, {
      }), jsxDEV("main", {
        children: [jsxDEV(Hero, {
        }), jsxDEV(TrustStrip, {
        }), jsxDEV(Foundations, {
        }), jsxDEV(Expertise, {
        }), jsxDEV(EditorialMarquee, {
        }), jsxDEV(Projects, {
          onEnquire: enquire
        }), jsxDEV(Approach, {
        }), jsxDEV(Quality, {
        }), jsxDEV(Contact, {
          interest: interest
        })]
      }), jsxDEV(Footer, {
      }), jsxDEV(Toaster, {
        theme: "dark",
        position: "bottom-right",
        richColors: true
      })]
    })
  });
}
export { Approach, Brand, Chapter, Contact, EditorialMarquee, EnquiryForm, Expertise, Footer, Foundations, Header, Hero, Projects, Quality, Reveal, TrustStrip };
export default App;
