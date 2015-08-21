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

sub count {
    my $self = shift;
    my $table = $self->table;

    $self->db->selectrow_array("SELECT COUNT(1) FROM $table");
}

sub all {
    my $self = shift;
    my $table = $self->table;
    my $data = $self->db->selectall_hashref("SELECT * FROM $table", "id");

    map { $self->new(%$_) } values %$data
}

sub by {
    my ($self, $field, $custom_select) = @_;
    $field = [ $field ] unless ref $field;

    my $table = $self->table;
    my $data = $self->db->selectall_hashref( $custom_select || "SELECT * FROM $table", $field);

    $self->_build( $data, scalar @$field );
}

sub _build {
    my ($self, $data, $depth) = @_;

    for my $key ( keys %$data ) {
        if ( $depth == 1 ) {
            $data->{$key} = $self->new( %{$data->{$key}} );
        } else {
            $data->{$key} = $self->_build( $data->{$key}, $depth - 1 );
        }
    }

    $data
}

1;
