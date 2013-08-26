; el-get package manager (the package manager)
(add-to-list 'load-path "~/.emacs.d/el-get/el-get")
(unless (require 'el-get nil 'noerror)
  (with-current-buffer
      (url-retrieve-synchronously
       "https://raw.github.com/dimitri/el-get/master/el-get-install.el")
    (let (el-get-master-branch)
      (goto-char (point-max))
      (eval-print-last-sexp))))
(el-get 'sync)
; Function for el-get cleanup
(defun el-get-cleanup (packages)
  "Remove packages not explicitly declared"
  (let* ((packages-to-keep (el-get-dependencies (mapcar 'el-get-as-symbol packages)))
         (packages-to-remove (set-difference (mapcar 'el-get-as-symbol
                                                     (el-get-list-package-names-with-status
                                                      "installed")) packages-to-keep)))
    (mapc 'el-get-remove packages-to-remove)))

;*** Mode/Plugin specific

; Install packages from el-get (TODO: remove depedencies?)
(setq my:el-get-packages
      '(epc
	ace-jump-mode
	auto-complete
	auto-complete-yasnippet
	autopair
	csharp-mode
	ctable
	deferred
	elpy
	feature-mode
	helm
	helm-c-yasnippet
	iedit
	jinja2-mode
	js2-mode
	multiple-cursors
	org-mode
	popup
	s
	smart-tab
	yasnippet
	zenburn-theme
    ))
(el-get 'sync my:el-get-packages)

; Acejump (quick movement)
(define-key global-map (kbd "å") 'ace-jump-mode)

; Autopair
(autopair-global-mode) ;; Enable autopair in all buffers

; ELPY Python IDE mode
; Set PYTHONPATH, because we don't load .bashrc. (TODO: needed?)
(setenv "PYTHONPATH" "/usr/local/lib/python2.7/site-packages:/usr/local/bin/:")
;(elpy-enable) TODO: enable

; Helm (good autocomplete framework or whatever)
;(require 'helm-config)
(global-set-key (kbd "C-c h") 'helm-mini)
(helm-mode 1) ;TODO: rem
; Connect Yasnippet with Helm
(defun shk-yas/helm-prompt (prompt choices &optional display-fn)
    "Use helm to select a snippet. Put this into `yas/prompt-functions.'"
    (interactive)
    (setq display-fn (or display-fn 'identity))
    (if (require 'helm-config)
        (let (tmpsource cands result rmap)
          (setq cands (mapcar (lambda (x) (funcall display-fn x)) choices))
          (setq rmap (mapcar (lambda (x) (cons (funcall display-fn x) x)) choices))
          (setq tmpsource
                (list
                 (cons 'name prompt)
                 (cons 'candidates cands)
                 '(action . (("Expand" . (lambda (selection) selection))))
                 ))
          (setq result (helm-other-buffer '(tmpsource) "*helm-select-yasnippet"))
          (if (null result)
              (signal 'quit "user quit!")
            (cdr (assoc result rmap))))
      nil))
; Set Yasnippet to use Helm as prompt
(setq yas-prompt-functions '(shk-yas/helm-prompt yas-ido-prompt yas-no-prompt))

; Multiple cursors
(global-set-key (kbd "C-<") 'mc/mark-next-like-this)
(global-set-key (kbd "C->") 'mc/mark-previous-like-this)
; Add cursor to every line in selection
(global-set-key (kbd "C-S-c C-S-c") 'mc/edit-lines)

; Yasnippet (snippets) (TODO: optimize load time)
(yas-global-mode 1)
(global-set-key (kbd "C-c s") 'yas/insert-snippet)

; Stock ido-mode for autocompletition
;(require 'ido)
;(ido-mode t)

; Orgmode code region syntax highlight
(setq org-src-fontify-natively t)

; Javascript
(autoload 'js2-mode "js2" nil t)
(add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
; Autocompletemode for javascript
(add-to-list 'load-path "~/site-elisp/auto-complete")
(require 'auto-complete-config)
(add-to-list 'ac-dictionary-directories "~/site-elisp/auto-complete/dict")
(setq-default ac-sources (add-to-list 'ac-sources 'ac-source-dictionary))
(global-auto-complete-mode t)
; Start auto-completion after 2 characters of a word
(setq ac-auto-start 2)
; case sensitivity is important when finding matches
(setq ac-ignore-case nil)
;Use yasnippet
(add-to-list 'ac-sources 'ac-source-yasnippet)
(define-key ac-mode-map (kbd "C-TAB") 'auto-complete)
(ac-set-trigger-key "TAB")

; ** Manually installed packages

; AngularJS Snippets
;(require 'angular-snippets) TODO:enable
(eval-after-load "sgml-mode"
  '(define-key html-mode-map (kbd "C-c C-d") 'ng-snip-show-docs-at-point))

; Arduino
(add-to-list 'load-path "~/site-elisp/arduino-mode/")
(setq auto-mode-alist (cons '("\\.\\(pde\\|ino\\)$" . arduino-mode) auto-mode-alist))
(autoload 'arduino-mode "arduino-mode" "Arduino editing mode." t)

; HTML
;(add-to-list 'load-path "~/site-elisp/emmet-mode")
;(require 'emmet-mode) ; https://github.com/smihica/emmet-mode
(add-hook 'sgml-mode-hook 'emmet-mode) ;; Auto-start on any markup modes
(add-hook 'css-mode-hook  'emmet-mode) ;; enable Emmet's css abbreviation.
(add-hook 'emmet-mode-hook (lambda () (setq emmet-indentation 2))) ;indent 2 spaces.

;
(autoload 'jedi:setup "jedi" nil t) 
