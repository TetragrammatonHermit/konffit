;;; custom --- packages
;;; Commentary:
;; Load packages
;;; Code:

;; Prelude modules
(require 'prelude-helm)
(require 'prelude-c)
(require 'prelude-common-lisp)
(require 'prelude-css)
(require 'prelude-emacs-lisp)
(require 'prelude-erc)
(require 'prelude-haskell)
(require 'prelude-js)
(require 'prelude-key-chord)
(require 'prelude-latex)
(require 'prelude-lisp)
(require 'prelude-org)
(require 'prelude-perl)
(require 'prelude-python)
(require 'prelude-scheme)
(require 'prelude-xml)

;; Elpa packages
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
                            ;ido-better-flex
                            slime
                            htmlize
                            google-translate
                            gnuplot-mode
                            ;color-theme-sanityinc-solarized
                            guide-key
                            visual-regexp
                            visual-regexp-steroids
                                        ;icicles ;(flexible buffer autocomplete)
                            smex
                                        ;autocomplete-mode
                            auto-complete
                            ac-slime
                            ac-emmet
                            ac-js2
                                        ; yasnippet
                            yasnippet
                            angular-snippets
                                        ; language modes
                            arduino-mode
                            sclang-extensions
                            sclang-snippets
                            csharp-mode
                            applescript-mode
                                        ;web
                            emmet-mode
                            js3-mode
                            js2-mode
                            js2-refactor
                            web-beautify
                            skewer-mode
                            ))

;;; emacs-packages.el ends here
