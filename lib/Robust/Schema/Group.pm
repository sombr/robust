package Robust::Schema::Group;
use Moo;
with "Robust::Schema";

use Types::Standard qw/:all/;

sub table { "groups" }

sub init {
    my ($class, $dbh) = @_;

    my $table = $class->table;
    $dbh->do(qq{
        CREATE TABLE IF NOT EXISTS $table (
            id INTEGER PRIMARY KEY ASC,
            name TEXT NOT NULL,
            start INTEGER NOT NULL,
            CONSTRAINT u_name_start
                UNIQUE ( name, start )
        )
    });
}

sub populate {
    my $self = shift;
    return if $self->count;
    my $data = require "data/group.data";

    my $table = $self->table;
    my $req = $self->db->prepare("INSERT INTO $table (name, start) VALUES (?,?)");
    $req->execute( @$_{qw/name start/} ) for @$data;
}

#---------------------------------------------------------------------------------

has id => (
    is => "ro",
    isa => Int,
    required => 1,
);

has name => (
    is => "ro",
    isa => Str,
    required => 1,
);

has start => (
    is => "ro",
    isa => Int,
    required => 1,
);

1;
