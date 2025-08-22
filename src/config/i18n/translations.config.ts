import {
    DefaultTranslationsObject,
    Language
} from "@payloadcms/translations";
import {
    en,
    enTranslations
} from "@payloadcms/translations/languages/en";
import {
    nl,
    nlTranslations
} from "@payloadcms/translations/languages/nl";

import { ActionTranslations } from "./types/action-translations.types";
import {
    SupportedLanguage,
    SupportedLanguageEnum
} from "./types/enums/supported-language.enum";

export type BaseTranslations = {
    custom: {
        action: {
            user: {
                logout: ActionTranslations;
            };
        };
        navigation: {
            header: {
                subtitle: {
                    welcome: string;
                };
            };
            link: {
                back: {
                    login: string;
                };
                forward: {};
            };
            nav: {
                main: {
                    console_dashboard: string;
                    console_website: string;
                    console_content: string;
                    console_brand: string;
                    console_media: string;
                    console_admin: string;
                };
                account: {
                    account: string;
                    log_out: string;
                };
            };
        };
        window: {
            pane: {
                page_menu: {
                    body: {
                        edit: {
                            title: string;
                            description: string;
                        };
                        preview: {
                            title: string;
                            description: string;
                        };
                        properties: {
                            title: string;
                            description: string;
                        };
                        on_off_times: {
                            title: string;
                            description: string;
                        };
                        create: {
                            title: string;
                            description: string;
                        };
                    };
                };
                page_creator: {
                    body: {
                        title: string;
                        form_fields: {
                            title: string;
                            description: string;
                        };
                    };
                    footer: {
                        cancel: string;
                        save: string;
                    };
                };
                page_editor: {
                    body: {
                        title: string;
                        form_fields: {
                            title: string;
                            description: string;
                            favicon: string;
                        };
                    };
                    footer: {
                        cancel: string;
                        save: string;
                    };
                };
                media_selector: {
                    title: string;
                    body: {
                        search_bar: {
                            placeholder: string;
                        };
                        search_results: {
                            no_results: string;
                        };
                        button: {
                            create_new: string;
                        };
                    };
                    footer: {
                        cancel: string;
                        confirm: string;
                    };
                };
                media_creator: {
                    title: string;
                    body: {
                        form_fields: {
                            name: string;
                            alt: string;
                        };
                    };
                    footer: {
                        cancel: string;
                        save: string;
                    };
                };
            };
        };
        general: {
            form: {
                file_upload: {
                    click_to_upload: string;
                    or_drag_and_drop: string;
                    file_specifications: string;
                    edit_upload: string;
                };
            };
        };
    };
} & DefaultTranslationsObject;

export const BaseI18nConfig: {
    fallbackLanguage: SupportedLanguageEnum;
    supportedLanguages: Record<SupportedLanguageEnum, Language>;
    translations: Record<SupportedLanguageEnum, BaseTranslations>;
} = {
    fallbackLanguage: SupportedLanguage.en,
    supportedLanguages: {
        [SupportedLanguage.en]: en,
        [SupportedLanguage.nl]: nl
    },
    translations: {
        [SupportedLanguage.en]: {
            ...enTranslations,
            custom: {
                action: {
                    user: {
                        logout: {
                            IDLE: "logging out",
                            PENDING: "logging out",
                            SUCCESS: "you are logged out successfully",
                            ERROR: "an error occurred whilst logging you out"
                        }
                    }
                },
                navigation: {
                    header: {
                        subtitle: {
                            welcome: "welcome"
                        }
                    },
                    link: {
                        back: {
                            login: "back to login page"
                        },
                        forward: {}
                    },
                    nav: {
                        main: {
                            console_admin: "admin",
                            console_brand: "brand",
                            console_content: "content",
                            console_dashboard: "dashboard",
                            console_media: "media",
                            console_website: "website"
                        },
                        account: {
                            account: "account",
                            log_out: "log out"
                        }
                    }
                },
                window: {
                    pane: {
                        page_menu: {
                            body: {
                                edit: {
                                    title: "edit page",
                                    description: "opens the website editor to modify the layout and page content"
                                },
                                preview: {
                                    title: "preview page",
                                    description: "view your unpublished changes as the would appear on the website"
                                },
                                properties: {
                                    title: "properties",
                                    description: "change the page’s metadata such as page information and social media sharing"
                                },
                                on_off_times: {
                                    title: "on/off times",
                                    description: "manage the publication schedule for the page or folder"
                                },
                                create: {
                                    title: "create",
                                    description: "create a new page or folder within the current page"
                                }
                            }
                        },
                        page_creator: {
                            body: {
                                title: "properties",
                                form_fields: {
                                    title: "page information",
                                    description: "description"
                                }
                            },
                            footer: {
                                cancel: "cancel",
                                save: "save"
                            }
                        },
                        page_editor: {
                            body: {
                                title: "properties",
                                form_fields: {
                                    title: "page information",
                                    description: "description",
                                    favicon: "favicon"
                                }
                            },
                            footer: {
                                cancel: "cancel",
                                save: "save"
                            }
                        },
                        media_selector: {
                            title: "media selector",
                            body: {
                                search_bar: {
                                    placeholder: "Name of the media you're looking for"
                                },
                                search_results: {
                                    no_results: "we did not find any results for \"{{query}}\""
                                },
                                button: {
                                    create_new: "create new"
                                }
                            },
                            footer: {
                                cancel: "cancel",
                                confirm: "confirm"
                            }
                        },
                        media_creator: {
                            title: "create media",
                            body: {
                                form_fields: {
                                    name: "name",
                                    alt: "alt"
                                }
                            },
                            footer: {
                                cancel: "cancel",
                                save: "save"
                            }
                        }
                    }
                },
                general: {
                    form: {
                        file_upload: {
                            click_to_upload: "click to upload",
                            or_drag_and_drop: "or drag and drop",
                            file_specifications: "SVG, PNG, JPG of GIF (max. 5mb)",
                            edit_upload: "edit upload"
                        }
                    }
                }
            }
        },
        [SupportedLanguage.nl]: {
            ...nlTranslations,
            custom: {
                action: {
                    user: {
                        logout: {
                            IDLE: "bezig met uitloggen",
                            PENDING: "bezig met uitloggen",
                            SUCCESS: "je bent succesvol uitgelogd",
                            ERROR: "er ging iets mis bij het uitloggen"
                        }
                    }
                },
                navigation: {
                    header: {
                        subtitle: {
                            welcome: "welkom"
                        }
                    },
                    link: {
                        back: {
                            login: "terug naar login pagina"
                        },
                        forward: {}
                    },
                    nav: {
                        main: {
                            console_admin: "admin",
                            console_brand: "merk",
                            console_content: "content",
                            console_dashboard: "dashboard",
                            console_media: "media",
                            console_website: "website"
                        },
                        account: {
                            account: "account",
                            log_out: "uitloggen"
                        }
                    }
                },
                window: {
                    pane: {
                        page_menu: {
                            body: {
                                edit: {
                                    title: "pagina bewerken",
                                    description: "opent de website bewerker om de layout van de pagina aan te passen"
                                },
                                preview: {
                                    title: "preview page",
                                    description: "bekijk jouw ongepubliceerde pagina zoals deze er zou staan op je webiste"
                                },
                                properties: {
                                    title: "properties",
                                    description: "pas de metatdata zoals pagina informatie en sociale media delen aan"
                                },
                                on_off_times: {
                                    title: "on/off times",
                                    description: "beheer het publicatieschema voor de pagina of folder"
                                },
                                create: {
                                    title: "create",
                                    description: "maak een nieuwe pagina of folder aan"
                                }
                            }
                        },
                        page_creator: {
                            body: {
                                title: "instellingen",
                                form_fields: {
                                    title: "pagina informatie",
                                    description: "omschrijving"
                                }
                            },
                            footer: {
                                cancel: "annuleren",
                                save: "opslaan"
                            }
                        },
                        page_editor: {
                            body: {
                                title: "instellingen",
                                form_fields: {
                                    title: "pagina informatie",
                                    description: "omschrijving",
                                    favicon: "favicon"
                                }
                            },
                            footer: {
                                cancel: "annuleren",
                                save: "opslaan"
                            }
                        },
                        media_selector: {
                            title: "afbeelding selectie",
                            body: {
                                search_bar: {
                                    placeholder: "Naam van de afbeelding die je zoekt"
                                },
                                search_results: {
                                    no_results: "we kunnen geen resultaten vinden voor \"{{query}}\""
                                },
                                button: {
                                    create_new: "nieuw aanmaken"
                                }
                            },
                            footer: {
                                cancel: "annuleren",
                                confirm: "bevestigen"
                            }
                        },
                        media_creator: {
                            title: "media aanmaken",
                            body: {
                                form_fields: {
                                    name: "naam",
                                    alt: "alt"
                                }
                            },
                            footer: {
                                cancel: "annuleren",
                                save: "opslaan"
                            }
                        }
                    }
                },
                general: {
                    form: {
                        file_upload: {
                            click_to_upload: "klik om te uploaden",
                            or_drag_and_drop: "of sleep een bestand",
                            file_specifications: "SVG, PNG, JPG of WEBP (max. 5mb)",
                            edit_upload: "aanpassen"
                        }
                    }
                }
            }
        }
    }
};
