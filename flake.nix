{
  description = "Setup Stonedstreet";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }: {
    defaultPackage.x86_64-linux = let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
      src = ./.;
    in
      pkgs.stdenv.mkDerivation {
        pname = "stonedstreet";
        version = "0.1";

        src = src;

        installPhase = ''
          mkdir -p $out
          cp -r $src $out/
        '';

        sourceRoot = ".";
      };
  };
}