;;; custom --- config
;;; Commentary:
;; Customizations to editor look and feel.
;; 
;;; Code:

;; Load packages
(prelude-require-packages '(window-numbering
                            key-chord
                            iy-go-to-char
                            multiple-cursors
                            google-translate
                            writeroom-mode
                            dired-details
                            smex
                            edit-server
                            ))

;; Default to UTF-8
(set-language-environment "UTF-8")

(set-face-attribute 'default nil :font "Droid Sans Mono-10")

(set-default 'cursor-type 'bar)
(set-cursor-color "white")

(scroll-bar-mode -1)  ; Disable scroll bar

(setq visible-bell 1)

(window-numbering-mode t) ; Change windows like chromium tabs

;; Keybindings for day/night themes
(global-set-key [H-end] '(lambda () (interactive)
                           (load-theme 'zenburn)
                           (set-cursor-color "white")))
(global-set-key [H-home] '(lambda () (interactive)
                            (disable-theme 'zenburn)
                            (set-cursor-color "black")))

(defalias 'yes-or-no-p 'y-or-n-p) ; y means yes

;; Make OSX special characters work with alt, set cmd to meta.
(setq mac-option-modifier 'nil
      mac-command-modifier 'meta
      x-select-enable-clipboard t)

;; Nicer mousewheel scrolling
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1) ((control) . nil)))
(setq mouse-wheel-progressive-speed nil)
;; Acme-like mouse right-click search next occurrence
(global-set-key [(mouse-3)] 'acme-search-forward)
(global-set-key [(shift mouse-3)] 'acme-search-backward)
;; Set new cursors on mouse clicks
(global-unset-key (kbd "M-<down-mouse-1>"))
(global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)
(global-set-key (kbd "H-<mouse-1>") 'mc/add-cursor-on-click)

; Make scratch-buffer more convenient
(setq initial-scratch-message "")
(setq initial-major-mode 'org-mode)

;; Use system default browser on linux
(setq browse-url-browser-function 'browse-url-generic
      browse-url-generic-program "x-www-browser")

(require 'google-translate)
(require 'google-translate-default-ui)
(global-set-key (kbd "C-x t") 'google-translate-at-point)
(global-set-key (kbd "C-x T") 'google-translate-at-point-reverse)
(setq google-translate-enable-ido-completion 't) ;;todo
(setq google-translate-show-phonetic 't)
(setq google-translate-default-target-language '"en")
(setq google-translate-default-source-language '"fi")
(set-face-attribute 'google-translate-translation-face nil :height 2)

;; Minibuffer autocompletition
;; http://www.masteringemacs.org/articles/2010/10/10/introduction-to-ido-mode/
(setq ido-enable-flex-matching t)
(setq ido-everywhere t)
(setq ido-use-filename-at-point 'guess)
(ido-mode t)
(setq ido-file-extensions-order '(".org" ".tex"))

;; Pop marks faster by repeated spacing
(setq set-mark-command-repeat-pop 't)

(global-set-key (kbd "M-x") nil)
(global-set-key (kbd "M-x") 'smex)  ;; Fuzzy command autocomplete

(setq ace-jump-mode-scope 'frame) ;; Jump only inside current frame
(setq ace-jump-mode-case-fold 'nil) ;; Case sensitived

;; More powerful jump back function from ace jump mode
(autoload
  'ace-jump-mode-pop-mark
  "ace-jump-mode"
  "Ace jump back:-)"
  t)
(eval-after-load "ace-jump-mode"
  '(ace-jump-mode-enable-mark-sync))

(define-key global-map (kbd "C-x SPC") 'ace-jump-mode-pop-mark)
(smartparens-global-mode +1)

(require 'key-chord)
(require 'iy-go-to-char)

(key-chord-mode +1)

(key-chord-define-global "jj" 'iy-go-to-char)
(key-chord-define-global "hh" 'iy-go-to-char-backward)
(global-set-key (kbd "C-c .") 'iy-go-to-or-up-to-continue)
(global-set-key (kbd "C-c ,") 'iy-go-to-or-up-to-continue-backward)
(setq iy-go-to-char-kill-ring-save t)

(global-set-key (kbd "C-c c") 'comment-or-uncomment-region)
(global-set-key (kbd "C-c SPC") 'er/expand-region)

;; Multiple cursors
(key-chord-define-global "jn" 'mc/mark-more-like-this-extended)
(key-chord-define-global "jt" 'mc/mark-sgml-tag-pair)
(key-chord-define-global "kd" 'mc/edit-lines)

;; Copy current buffer path to clipboard
(define-key prelude-mode-map (kbd "C-c w") 'prelude-copy-file-name-to-clipboard)

;;; Dired
;; allow dired to be able to delete or copy a whole dir.
(setq dired-recursive-copies (quote always)) ; “always” means no asking
(setq dired-recursive-deletes (quote top)) ; “top” means ask once

;; Use split window as default copy/rename target
;; Works nicely with tramp as a sftp file manager.
(setq dired-dwim-target t)

(require 'dired-details) ;; Suppress noise on dired window
(dired-details-install)
(setq-default dired-details-hidden-string "")

;; Add week numbers to calendar
(copy-face font-lock-constant-face 'calendar-iso-week-face)
(set-face-attribute 'calendar-iso-week-face nil
                    :height 0.7)
(setq calendar-intermonth-text
      '(propertize
        (format "%2d"
                (car
                 (calendar-iso-from-absolute
                  (calendar-absolute-from-gregorian (list month day year)))))
        'font-lock-face 'calendar-iso-week-face))

;; Set week to start on monday
(setq calendar-week-start-day 1)

;;; Email
;;(load-file "~/.wl")
;; (autoload 'wl "wl" "Wanderlust" t)
;; (autoload 'wl-other-frame "wl" "Wanderlust on new frame." t)
;; (autoload 'wl-draft "wl-draft" "Write draft with Wanderlust." t)

;; Set projectile to create a cache 
(setq projectile-enable-require 'projectile)
(setq projectile-enable-caching t)

;; ignore svn projects that couse trouble on windows vm's
(setq projectile-globally-ignored-directories (append '(".svn") projectile-globally-ignored-directories))
(setq projectile-globally-ignored-files (append '("*.svn-base" "*.o" "*.pyc") projectile-globally-ignored-files))
(setq projectile-use-native-indexing t)
(setq projectile-svn-command "find . -type f -print0")

(projectile-global-mode)

(set-variable 'magit-emacsclient-executable "/usr/bin/emacsclient") ; Magit use current window

;; Set emerge as git mergetool
(setq emerge-diff-options "--ignore-all-space")


(load "server")
(unless (server-running-p) (server-start)) ; Run emacs server

(require 'edit-server)
(edit-server-start) ; Edit server chromium extension

;;; general.el ends here
