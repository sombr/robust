package Robust::View::Template;
use Moo;

extends "Template::Mustache";
$Template::Mustache::template_path = "template";

use Types::Standard qw/:all/;

has page_title => (
    is => "lazy",
    isa => Str,
    default => sub { $_[0]->title },
);

has title => (
    is => "ro",
    isa => Str,
    required => 1,
);

has session => (
    is => "ro",
    isa => Maybe[HashRef],
);

sub template_namespace {
    "Robust::View::Template";
}

1;
