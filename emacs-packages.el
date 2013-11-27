;;;; Package setup
(require 'package)
(add-to-list 'package-archives
             '("marmalade" .
               "http://marmalade-repo.org/packages/"))
(package-initialize)

                                        ; currently disabled: scad-mode
(prelude-require-packages '(elpy
                            key-chord
                            ecb
                            applescript-mode
                            auto-complete
                            ac-emmet
                            ac-js2
                            angular-snippets
                            multiple-cursors
                            js2-mode
                            emmet-mode
                            iy-go-to-char
                            
                            ))
