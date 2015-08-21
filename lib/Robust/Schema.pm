package Robust::Schema;
use Moo::Role;

use DBI;
use DBD::SQLite;

use Scalar::Util qw/blessed/;

my $dbh;
my $init = {};
sub db {
    my $self = shift;
    $dbh //= DBI->connect("dbi:SQLite:dbname=data/data.sqlite","","");
    $dbh->do(q{PRAGMA foreign_keys = ON});

    my $class = blessed $self || $self;
    $init->{$class} ||= $class->init($dbh);

    $dbh;
}

requires "init";
requires "table";

sub all {
    my $self = shift;
    my $table = $self->table;
    my $data = $self->db->selectall_hashref("SELECT * FROM $table", "id");

    map { $self->new(%$_) } values %$data
}

sub by {
    my ($self, $field) = @_;
    my $table = $self->table;
    my $data = $self->db->selectall_hashref("SELECT * FROM $table", $field);

    for my $key ( keys %$data ) {
        $data->{$key} = $self->new( %{$data->{$key}} );
    }

    $data
}

1;
