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
                            auto-complete
                            dired-details
                            yasnippet
                            multiple-cursors
                            iy-go-to-char
                            slime
                            ac-slime
                                        ; languages
                            csharp-mode
                            applescript-mode
                                        ;web
                            angular-snippets
                            emmet-mode
                            ac-emmet
                            js2-mode
                            ac-js2
                            js2-refactor
                            web-beautify
                            skewer-mode
                            ))
