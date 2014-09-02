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
                            dired+
                            dedicated
                            smex
                            edit-server
                            evil
                            solarized-theme
                            revive
                            ))

;; Default to UTF-8
(set-language-environment "UTF-8")

(set-default 'cursor-type 'bar) ;; thin cursor
;;(set-cursor-color "white")

;;(set-default 'cursor-type t) ;; fat cursor
;;(global-hl-line-mode -1)

(scroll-bar-mode -1) ; Disable scroll bars


;;(setq visible-bell t)
(setq ring-bell-function 'ignore)

(window-numbering-mode t) ; Change windows like chromium tabs

(disable-theme 'zenburn) ; Disable prelude default theme
(load-theme 'solarized-light)

;; Keybindings for day/night themes
(global-set-key [H-end] '(lambda () (interactive)
                           (disable-theme 'solarized-light)
                           (load-theme 'solarized-dark)
                           (set-cursor-color "white")))
(global-set-key [H-home] '(lambda () (interactive)
                            (disable-theme 'solarized-dark)
                            (load-theme 'solarized-light)
                            (set-cursor-color "black")))

(defalias 'yes-or-no-p 'y-or-n-p) ; y means yes

;; Nicer mousewheel scrolling
(setq mouse-wheel-scroll-amount '(1 ((shift) . 1) ((control) . nil)))
(setq mouse-wheel-progressive-speed nil)
;; Acme-like mouse right-click search next occurrence
(global-set-key [(mouse-3)] 'acme-search-forward)
(global-set-key [(shift mouse-3)] 'acme-search-backward)
;; Focus clicked line
(defun focus-line (posn)
  (interactive "e")
  (mouse-set-point posn) ; Select mouse postition
  (recenter 0) ; Move line to top
  )
(global-unset-key  [s-mouse-3])
(global-set-key  [s-mouse-3] 'focus-line)

;; Set new cursors on mouse clicks
(global-unset-key (kbd "M-<down-mouse-1>"))
(global-set-key (kbd "M-<mouse-1>") 'mc/add-cursor-on-click)
(global-set-key (kbd "H-<mouse-1>") 'mc/add-cursor-on-click)
                                        ; Make scratch-buffer more convenient
(setq initial-scratch-message "")
;(setq initial-major-mode 'org-mode)

;; OS Specific stuff
(cond
 ;; Linux
 ((string-equal system-type "gnu/linux")
  (horizontal-scroll-bar-mode -1)  
  ;; Default www browser
  (setq browse-url-browser-function 'browse-url-generic
        browse-url-generic-program "sensible-browser")
  ;; Magit use current window
  (set-variable 'magit-emacsclient-executable "/usr/bin/emacsclient")
  (set-face-attribute 'default nil :font "DejaVu Sans Mono-9")
  ;;(set-face-attribute 'default nil :font "FreeSans-11")
  ;; Inconsolata-9 DejaVu Sans Mono-9
  )
 ;; OSX
 ((string-equal system-type "darwin")
  (set-variable 'magit-emacsclient-executable "/Applications/Emacs.app/Contents/MacOS/bin/emacsclient")
  (setq mac-option-modifier 'nil
        mac-command-modifier 'meta
        mac-function-modifier 'hyper
        x-select-enable-clipboard t)
  (setq system-uses-terminfo nil)
  (global-set-key (kbd "M-§") 'ns-next-frame)
  )
 )

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

(key-chord-define-global "fj" 'ace-jump-word-mode)
(key-chord-define-global "jj" 'iy-go-to-char)
(key-chord-define-global "hh" 'iy-go-to-char-backward)
(global-set-key (kbd "C-c .") 'iy-go-to-or-up-to-continue)
(global-set-key (kbd "C-c ,") 'iy-go-to-or-up-to-continue-backward)
(setq iy-go-to-char-kill-ring-save t)

(global-set-key (kbd "C-c c") 'comment-or-uncomment-region)
(global-set-key (kbd "C-c SPC") 'er/expand-region)

;; Multiple cursors
(key-chord-define-global "jn" 'mc/mark-more-like-this-extended)
(key-chord-define-global "jm" 'mc/mark-all-like-this)
(key-chord-define-global "jt" 'mc/mark-sgml-tag-pair)
(key-chord-define-global "kd" 'mc/edit-lines)
;; TODO add cursors to previous marks

;; Copy current buffer path to clipboard
(define-key prelude-mode-map (kbd "C-c w") 'prelude-copy-file-name-to-clipboard)

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

;; Set emerge as git mergetool
;; (setq emerge-diff-options "--ignore-all-space")

;;
(setq ediff-make-buffers-readonly-at-startup nil)

(load "server")
(unless (server-running-p) (server-start)) ; Run emacs server

(require 'edit-server)
(edit-server-start) ; Edit server chromium extension

;;; Dired
(add-hook 'dired-mode-hook 'auto-revert-mode)

;; allow dired to be able to delete or copy a whole dir.
(setq dired-recursive-copies (quote always)) ; “always” means no asking
(setq dired-recursive-deletes (quote top)) ; “top” means ask once

;; Use split window as default copy/rename target
;; Works nicely with tramp as a sftp file manager.
(setq dired-dwim-target t)

(setq tramp-default-method "ssh")

(require 'dired-details) ;; Suppress noise on dired window
(dired-details-install)
(setq-default dired-details-hidden-string "")

(defun dired-open-in-external-app ()
  "Open the current file or dired marked files in external app."
  (interactive)
  (let ( doIt
         (myFileList
          (cond
           ((string-equal major-mode "dired-mode") (dired-get-marked-files))
           (t (list (buffer-file-name))) ) ) )

    (setq doIt (if (<= (length myFileList) 5)
                   t
                 (y-or-n-p "Open more than 5 files?") ) )

    (when doIt
      (cond
       ((string-equal system-type "windows-nt")
        (mapc (lambda (fPath) (w32-shell-execute "open" (replace-regexp-in-string "/" "\\" fPath t t)) ) myFileList)
        )
       ((string-equal system-type "darwin")
        (mapc (lambda (fPath) (shell-command (format "open \"%s\"" fPath)) )  myFileList) )
       ((string-equal system-type "gnu/linux")
        (mapc (lambda (fPath) (let ((process-connection-type nil)) (start-process "" nil "xdg-open" fPath)) ) myFileList) ) ) ) ) )

(add-hook 'dired-mode-hook
          '(lambda ()
             (define-key dired-mode-map "0" 'dired-open-in-external-app)))

(defun toggle-current-window-dedication ()
  (interactive)
  (let* ((window    (selected-window))
         (dedicated (window-dedicated-p window)))
    (set-window-dedicated-p window (not dedicated))
    (message "Window %sdedicated to %s"
             (if dedicated "no longer " "")
             (buffer-name))))

(global-set-key [pause] 'toggle-current-window-dedication)



;;; general.el ends here











