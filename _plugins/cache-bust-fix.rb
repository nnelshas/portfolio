# frozen_string_literal: true
#
# Fix for the `jekyll-cache-bust` gem (v0.0.1) used by al-folio.
#
# The upstream `bust_css_cache` filter hashes the contents of files under
# `assets/_sass`, but al-folio keeps its Sass partials in `_sass` (repo root).
# Because that directory never matches, `Dir[...]` returns an empty list, the
# joined content is "", and the MD5 is always the empty-string digest
# (d41d8cd98f00b204e9800998ecf8427e). The resulting `?v=` token is identical on
# every build, so browsers cache `main.css` forever and never pick up CSS
# changes after the first visit.
#
# This override hashes the real Sass sources (`_sass/**/*`) plus the
# `assets/css/main.scss` entry point, so the token changes whenever the
# stylesheet actually changes — and only then.

require "digest/md5"

module Jekyll
  module CacheBust
    def bust_css_cache(file_name)
      sources = Dir[File.join("_sass", "**", "*")]
                .reject { |f| File.directory?(f) }
                .sort
                .map { |f| File.read(f) }

      main_scss = File.join("assets", "css", "main.scss")
      sources << File.read(main_scss) if File.exist?(main_scss)

      digest = Digest::MD5.hexdigest(sources.join)
      [file_name, "?v=", digest].join
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBust)
