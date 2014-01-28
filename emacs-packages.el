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
                                        ;icicles ;(flexible buffer autocomplete)
                            color-theme-solarized
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
                            sclang-extensions
                            sclang-snippets
                            csharp-mode
                            applescript-mode
                                        ;web
                            js-comint
                            emmet-mode
                            js2-mode
                            js2-refactor
                            web-beautify
                            skewer-mode
                            impatient-mode
                            ))

;;; emacs-packages.el ends here
