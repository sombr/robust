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

has nav_menu => (
    is => "ro",
    isa => ArrayRef[HashRef],
    default => sub { [] }
);

has in_mem => (
    is => "ro",
    isa => Bool,
    default => 1,
);

sub template_namespace {
    "Robust::View::Template";
}

sub read_file {
    my $self = shift;
    $self->{__mem__template__} //= $self->SUPER(@_);
}

1;
