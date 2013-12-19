;;;; Package setup
(require 'package)
(add-to-list 'package-archives
             '("marmalade" .
               "http://marmalade-repo.org/packages/"))
(package-initialize)

                                        ; currently disabled: scad-mode
(prelude-require-packages '(elpy
                                        ;general
                            key-chord
                            ecb
                            dired-details
                            multiple-cursors
                            iy-go-to-char
                            slime
                                        ;autocomplete-mode
                            auto-complete
                            ac-slime
                            ac-emmet
                            ac-js2
                                        ; yasnippet
                            yasnippet
                            angular-snippets
                                        ; language modes
                            csharp-mode
                            applescript-mode
                                        ;web
                            emmet-mode
                            js2-mode
                            js2-refactor
                            web-beautify
                            skewer-mode
                            ))
