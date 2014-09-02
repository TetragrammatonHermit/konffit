;; After install replace builtin org with one from elpa!

;; Location of Org files on local system
(setq org-directory "~/Dropbox/notes/")
(setq org-default-notes-file  "~/Dropbox/notes/gtd.org")
(setq org-agenda-files '("~/Dropbox/notes/gtd.org"))

;; Org-mobile setup
(setq org-mobile-files '("~/Dropbox/notes/gtd.org"))
(setq org-mobile-directory "~/Dropbox/Apps/MobileOrg")
;; File where new mobile-notes will be stored
(setq org-mobile-inbox-for-pull "~/Dropbox/notes/mobile-incoming.org")


(setq org-use-fast-todo-selection t)
(setq org-use-fast-tag-selection t)
(setq org-catch-invisible-edits 'smart)
(setq org-ctrl-k-protect-subtree t)


(setq org-refile-targets '((org-agenda-files :maxlevel . 3)))
(setq org-refile-use-outline-path t)
(setq org-outline-path-complete-in-steps t)
;;(setq org-refile-allow-creating-parent-nodes t)
(prelude-require-package 'org-trello)

;; Emacs global keybindings
(global-set-key (kbd "H-c") 'org-capture)
(global-set-key (kbd "H-a") 'org-agenda)

;;(global-set-key "\C-c\C-cl" 'org-store-link)
;;(global-set-key "\C-c\C-cb " 'org-iswitchb)

;; http://ergoemacs.org/emacs/emacs_set_keys_for_major_mode.html
(defun own-org-mode-hook ()
  "Modify keymaps and settings used by `org-mode'."

  (local-set-key (kbd "H-*") 'org-move-subtree-up) ; For Mac
  (local-set-key (kbd "H-p") 'org-move-subtree-up)
  (local-set-key (kbd "H-n") 'org-move-subtree-down)

  ;; Prefer thin cursor when writing
  ;; (set-default 'cursor-type 'bar)
  
  (visual-line-mode +1)
  (org-indent-mode +1)
    
  (defun org-zoom-headline ()
    ""
    (interactive)
    (org-tree-to-indirect-buffer)
    (other-window -1)
    (delete-other-windows)
    )
  (define-key org-mode-map (kbd "C-c z") 'org-zoom-headline)


  ;; Add syntax highlight to src blocks
  (prelude-require-package 'htmlize)
  (setq org-src-fontify-natively t)

  (setq org-export-backends (quote (
                                    md
                                    ascii
                                    html
                                    latex
                                    odt)))
  )

(add-hook 'org-mode-hook 'own-org-mode-hook)

(require 'org-protocol)

(setq org-capture-templates
      '(
        ;; Org-protocol
        ("t" "Task / Chore" entry (file+headline "~/Dropbox/notes/gtd.org" "Task / Chore")
         "* TODO %?\n  %i\n")
        ("m" "Calendar" entry (file+headline "~/Dropbox/notes/gtd.org" "Calendar") "* APPT %?\n  %i\n")
        ("r" "Raw thought" entry (file+headline "~/Dropbox/notes/gtd.org" "Raw thought")
         "* %?\n  %i\n")
        ("b" "Buy" entry (file+headline "~/Dropbox/notes/todo.org" "Task / Chore")
         "* TODO Osta %?\n  %i\n")
        ("o" "Tweaks to OS" entry (file+headline "~/Dropbox/notes/someday.org" "OS Tweak") "* %?\n  %i\n")
        ("s" "Song" item (file+headline "~/Dropbox/notes/music.org" "New music")
         "%?\n  %i\n")
        ("j" "Journal entry" entry (file+datetree "~/Dropbox/notes/notetoself.org")
         "* %?\nEntered on %U\n  %i\n")
        ("d" "Dream" entry (file+headline "~/Dropbox/notes/notetoself.org" "Dreams") "* %U\n  %i\n%?")))


(setq org-agenda-custom-commands
      '(("c" "Desk Work" tags "HOME" ;; (1) (2) (3) (4)
         ((org-agenda-files '("~/Dropbox/notes/gtd.org")) ;; (5)
          (org-agenda-sorting-strategy '(priority-up effort-down))) ;; (5) cont.
         ("~/computer.html")) ;; (6)
        ;; ...other commands here
        ("H" "Office and Home Lists"
         ((agenda)
          
          (tags-todo "JYU")
          (tags-todo "ONLINE")
          (tags-todo "HOME")
          (tags-todo "TOWN")
          (tags-todo "PUTKILAHTI")
          (tags-todo "FUN")))
        ("D" "Daily Action List"
         (
          (agenda "" ((org-agenda-ndays 1)
                      (org-agenda-sorting-strategy
                       (quote ((agenda time-up priority-down tag-up) )))
                      (org-deadline-warning-days 5)
                      ))))
        ))

(setq org-refile-targets (quote (("gtd.org" :maxlevel . 1) ("someday.org" :level . 2))))


(add-hook 'after-init-hook 'org-mobile-pull)
;(add-hook 'kill-emacs-hook 'org-mobile-push)

;; Org-mobile auto sync when idle
(defvar my-org-mobile-sync-timer nil)

(defvar my-org-mobile-sync-secs (* 60 20))

(defun my-org-mobile-sync-pull-and-push ()
  (org-mobile-pull)
  (org-mobile-push)
  (when (fboundp 'sauron-add-event)
    (sauron-add-event 'my 3 "Called org-mobile-pull and org-mobile-push")))

(defun my-org-mobile-sync-start ()
  "Start automated `org-mobile-push'"
  (interactive)
  (setq my-org-mobile-sync-timer
        (run-with-idle-timer my-org-mobile-sync-secs t
                             'my-org-mobile-sync-pull-and-push)))

(defun my-org-mobile-sync-stop ()
  "Stop automated `org-mobile-push'"
  (interactive)
  (cancel-timer my-org-mobile-sync-timer))

;;(my-org-mobile-sync-start)

(setq epa-file-select-keys nil)
(setq epa-file-cache-passphrase-for-symmetric-encryption t)
(setenv "GPG_AGENT_INFO" 'nil)
