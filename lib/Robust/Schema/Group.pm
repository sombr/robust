package Robust::Schema::Group;
use Moo;

with "Robust::Schema";

sub init {
    my ($class, $dbh) = @_;

    $dbh->do(q{
        CREATE TABLE IF NOT EXISTS groups (
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
    my $data = require "data/group.data";

    my $req = $self->db->prepare("INSERT INTO groups (name, start) VALUES (?,?)");
    $req->execute( @$_{qw/name start/} ) for @$data;
}

1;
